import {Website, WebsiteStore,} from "../../src/models/website.model";
import {User, UserStore} from "../../src/models/user.model";

const websiteStore = new WebsiteStore()
const userStore = new UserStore()


describe("Website Model", () => {
    let website: Website
    let user: User

    it('should have an index method', () => {
        expect(websiteStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(websiteStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(websiteStore.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(websiteStore.delete).toBeDefined();
    });


    beforeAll(async () => {
        user = await userStore.create({
            userName: "mistro",
            email: "mistrokli@gmail.com",
            password: "password123"
        });
    })


    it('create method should add a website', async () => {

        // @ts-ignore
        const result = await websiteStore.create({
            name: "Google LLC",
            url: "google.com",
            category: "Search Engine",
            description: "This is a website",
            createdBy: user.id
        });

        website = result;

        expect(result).toMatchObject({
            // id: 1,
            name: "Google LLC",
            url: "google.com",
            category: "Search Engine",
            description: "This is a website",
            createdBy: user.id
        });
    });

    it('show method should return the correct website', async () => {
        const result = await websiteStore.show(website.id);
        expect(result).toMatchObject({
            // id: 1,
            name: "Google LLC",
            url: "google.com",
            category: "Search Engine",
            description: "This is a website",
            createdBy: user.id
        });
    });

    it('index method should return a list of website', async () => {
        const result = await websiteStore.index(1, 0);
        expect(result).toMatchObject([{
            // id: 1,
            name: "Google LLC",
            url: "google.com",
            category: "Search Engine",
            description: "This is a website",
            createdBy: user.id
        }]);
    });

    it('delete method should remove the website', async () => {
        await websiteStore.delete(website.id, user.id);
        const result = await websiteStore.index(1, 0)
        expect(result).toEqual([]);
    });

    afterAll(async () => {
        await userStore.delete(user.id)
    })

});


// xdescribe("# Testing storageService", () => {
//     test('should have impliment IPostStorage interface', () => {
//         expect(true).toBe(true)
//     })
// })
//
