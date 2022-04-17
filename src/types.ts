export type User = {
  _id: string
  username: string
  created: string
}

export type Offer = {
  user: {
    _id: string
    username: string
  }
}

export type Map = {
  features: {
    properties: {
      id: string
    }
  }[]
}

export type Contact = {
  created: string
  confirmed: boolean
  user: {
    _id: string
    username: string
  }
}
