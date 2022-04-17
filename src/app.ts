import { config } from 'dotenv'
import fs from 'fs-extra'
import * as api from './api'
import delay from './delay'

config()

const usersFile = 'output/users.txt'
const contactsFile = 'output/contacts.txt'

const getMapUsers = async (): Promise<Set<string>> => {
  const usernames = new Set<string>()
  const offers = (await delay(300, api.getMap())).features.map(
    feature => feature.properties.id,
  )

  let i = 0
  const len = offers.length
  for (const offerId of offers) {
    const username = (await delay(300, api.getOffer(offerId))).user.username
    usernames.add(username)
    console.log(++i, len, username)
  }

  return usernames
}

const crawl = async (usernames: Set<string>) => {
  await fs.ensureFile(usersFile)
  await fs.ensureFile(contactsFile)
  await fs.writeFile(usersFile, '')
  await fs.writeFile(contactsFile, '')

  const unvisited = new Set<string>(usernames)
  const visited = new Set<string>()

  while (unvisited.size > 0) {
    const [current] = [...unvisited]

    try {
      const user = await delay(300, api.user(current))
      await fs.appendFile(usersFile, `${user.username},${user.created}\n`)
      const contacts = await delay(300, api.contacts(user._id))
      for (const contact of contacts) {
        if (!visited.has(contact.user.username) && contact.confirmed) {
          unvisited.add(contact.user.username)
          await fs.appendFile(
            contactsFile,
            `${user.username},${contact.user.username},${contact.created}\n`,
          )
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      unvisited.delete(current)
      visited.add(current)

      console.log(visited.size, current, unvisited.size)
    }
  }
}

;(async () => {
  const username = process.env.username
  const password = process.env.password

  if (!username || !password) {
    throw new Error('Please provide your trustroots credentials in .env file')
  }

  await api.signin(username, password)

  const initialUsers = await getMapUsers()

  await crawl(initialUsers)
})()
