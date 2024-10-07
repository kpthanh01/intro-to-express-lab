const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];



app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

app.get('/greetings/:username', (req, res) => {
  res.send(`What a delight it is to see you once more, ${req.params.username}`)
})

app.get('/roll/:number', (req, res) => {
  let number = parseInt(req.params.number)
  if (!isNaN(number)) {
    let randomNum = Math.ceil(Math.random() * number)
    res.send(`You rolled a ${randomNum}`)
  } else {
    res.send('You must specify a number')
  }
})

app.get('/collectibles/:index', (req, res) => {
  let selectedItem = collectibles[req.params.index]
  if (selectedItem) {
    res.send(`So, you want the ${selectedItem.name}? For ${selectedItem.price}, it can be yours!`)
  } else {
    res.send('This item is not yet in stock. Check back soon!')
  }
})

app.get('/shoes', (req, res) => {
  let minPrice = req.query.minPrice
  let maxPrice = req.query.maxPrice
  let type = req.query.type

  if (minPrice) {
    let minArr = shoes.filter(item => item.price < minPrice)
    res.send(minArr)
  }
  else if (maxPrice) {
    let maxArr = shoes.filter(item => item.price > maxPrice)
    res.send(maxArr)
  }
  else if (type) {
    let typeArr = []
    shoes.forEach(item => {
      if(item.type == type) {
        console.log(item)
        typeArr.push(item)
      }
    })
    if(typeArr.length) {
      res.send(typeArr)
    } else {
      res.send('This type of shoe is not available')
    }
    
  }
  else {
    res.send(shoes)
  }
})

