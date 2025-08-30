export const getAvatar = (user: any): any => {
  if(!user.avatar) {
    return "https://secure.gravatar.com/avatar/e4e39af21d563943b076882d6e57ebf8?s=48&d=mm&r=g"
  }
  return `${user.avatar}`
}