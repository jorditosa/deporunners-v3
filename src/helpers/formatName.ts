export function formatName(name: string) {
  let newName = name.split(" ");
  return newName.slice(0, newName.length - 1).join(" ");
}