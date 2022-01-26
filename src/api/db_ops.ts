// DB operations method
import { createClient } from "@supabase/supabase-js"
import YAML from "yaml"
import * as fs from "fs"
import axios from "axios"

const config = YAML.parse(fs.readFileSync('src/.config.yml', 'utf-8'))


const admin_client = createClient(config.SUPABASE_DB.URL, config.SUPABASE_DB.SEC_KEY)
const public_client = createClient(config.SUPABASE_DB.URL, config.SUPABASE_DB.PUB_KEY)


//curl "https://api.twitter.com/2/tweets?expansions=author_id" -H "Authorization: Bearer $BEARER_TOKEN"
export async function getAuthID(tweet_id: string){
    const URL = `https://api.twitter.com/2/tweets/${tweet_id}?expansions=author_id`

    const api_call = await axios.get(URL, {
        headers : {
            'Authorization': `Bearer ${config.TWITTER_API.BEARER_TOKEN}`
        }
    })

    return api_call.data.data.author_id
}

export async function onSend(address_from: string, value: number, tweet_id: string, chainID?: string){
    // Register address[msg.sender], value, chain, 
    const _authID = await getAuthID(tweet_id)

    let {data, error} = await admin_client.from(`${config.SUPABASE_DB.NAME}`).insert([{
        address_from: address_from, value: value, tweet_id: tweet_id, auth_id: _authID
    }])

    if(data) { return data } 
    console.error(error)
}



async function onClaim(){

}