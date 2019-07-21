import express from "express"
import { router } from "../routes/index.route"
import bodyParser from "body-parser"

const start = async () => {
	try {
		// await db.init()

		// if (env === "development") {
		// 	const { seed } = await import("../db/seed")
		// 	seed()
		// }

		const app = express()
		app.use(bodyParser.json())

    // Serve the backend API
    app.use("/", router)
    // Serve the static frontend assets
    app.use(express.static('../app/build'))

		const port = 4000
		app.listen(port, () => console.log(`App listening on port ${port}!`))
	} catch (error) {
		console.error("Error: Failed to start app.", error)
	}
}

start()
