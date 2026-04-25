global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ people: [{ name: 'Test Astronaut' }] })
  })
)

const { document } = require('./helpers')
const { displayAstronauts } = require('../index')

// Sample test suite for fetching and displaying astronaut data
describe('Fetching and Displaying Astronaut Data', () => {
  let astronautList

  beforeAll(() => {
    astronautList = document.getElementById('astronaut-list')
  })

  it('should select the astronaut-list element', () => {
    expect(astronautList).not.toBeNull()
  })

  it('should fetch and display astronaut data', async () => {
    // Simulate fetching data from the API
    const response = await fetch('http://api.open-notify.org/astros.json')
    const data = await response.json()
    displayAstronauts(data.people)

    // Check if the astronautList has been updated
    const listItems = astronautList.querySelectorAll('li')
    expect(listItems.length).toBeGreaterThan(0)
  })
})
