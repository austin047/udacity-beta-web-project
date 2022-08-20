import app from "./server";

const port = process.env.PORT || 3000

const address: string = `0.0.0.0:${port}`


app.listen(port, function () {
    if (process.env.NODE_ENV !== 'test') {
        console.log(`Environment[${process.env.NODE_ENV}] | starting app on: ${address}`)
    }
})