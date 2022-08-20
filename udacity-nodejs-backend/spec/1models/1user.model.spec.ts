import {User, UserStore} from "../../src/models/user.model";

const userStore = new UserStore()

describe("User Model", () => {
    let user: User;
    it('should have an index method', () => {
        expect(userStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(userStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(userStore.create).toBeDefined();
    });

    it('should have an autheticate method', () => {
        expect(userStore.authenticate).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(userStore.delete).toBeDefined();
    });


    it('create method should add a user', async () => {
        // @ts-ignore
        const result = await userStore.create({
            userName: "mistro",
            email: "mistro@gmail.com",
            password: "password123"
        });


        user = result;

        expect(result).toMatchObject({
            // id: 1,
            userName: "mistro",
            email: "mistro@gmail.com"
        });
    });

    it('show method should return the correct user', async () => {
        const result = await userStore.show(user.id);
        expect(result).toMatchObject({
            // id: 1,
            userName: "mistro",
            email: "mistro@gmail.com"
        });
    });


    it('index method should return a list of user', async () => {
        const result = await userStore.index();
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({
                userName: "mistro",
                email: "mistro@gmail.com"
            })
        ]));
    });

    it('index method should return a authenticated user', async () => {
        const result = await userStore.authenticate("mistro@gmail.com", "password123")

        expect(result).toMatchObject({
            // // id: 1,
            userName: "mistro",
            email: "mistro@gmail.com"
        });

    });

    it('delete method should remove the user', async () => {
        await userStore.delete(user.id);
        const result = await userStore.index()
        expect(result).not.toEqual(expect.arrayContaining([
            expect.objectContaining({
                userName: "mistro",
                email: "mistro@gmail.com"
            })
        ]));
    });

});

// xdescribe("# Testing storageService", () => {
//   test('should have impliment IPostStorage interface', () => {
//     expect(true).toBe(true)
//   })
// })