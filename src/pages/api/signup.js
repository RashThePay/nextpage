
import { login as url } from "@/api";
export default async function handler(req, res) {
    const body = req.body
    let header = {
        'content-type': 'application/json' }

    let response = await fetch(url+"/register", { method: "POST", body: JSON.stringify(body), headers: header });
    if (response.ok) {
        res.status(200).json({success: 'success'})
    } else {
        const error = await response.text()
        res.status(400).json({error: error})
    }
}