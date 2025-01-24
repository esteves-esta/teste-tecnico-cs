import SearchHandler from "../utils/SearchHandler";

function save(query: string) {
  try {
    SearchHandler.saveHistory(query)

  } catch (error) {

    console.error(`Error on saving search history: ${error}`)

    throw error;
  }
}
function get() {
  try {
    return SearchHandler.getHistory()

  } catch (error) {
    console.error(`Error on getting search history: ${error}`)

    throw error;
  }
}
function remove(query: string) {
  try {
    SearchHandler.remove(query)

  } catch (error) {
    console.error(`Error on removing item from search history: ${error}`)

    throw error;
  }
}
export default {
  save, get, remove
}
