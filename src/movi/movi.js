router.get('/movies', function (req, res) {
   const arr2 = ["rand de basnasti" , "the shining", "lord of the rings", "bartman begins"]


   res.send(arr2)
   
});


router.get('/movies/:indexnumber', function (req, res) {
     const value = req.params.indexnumber

   const arr = ["rand de basnasti" , "the shining", "lord of the rings", "bartman begins"]
   const arrlen = arr.length
   if (value < arrlen) {
      res.send(arr[value])
   } else {
      let str = "use a valid index"
      res.send(str)
   }

});

router.get('/films', function (req, res) {
   
   const arr4 = [
      {
         id: 1, 
         name: "The Shining"
        },
      {
         id: 2, 
         name: "lord of rings"
        },
      {
         id: 3, 
         name: "pk"
        },
      {
         id: 4, 
         name: "attack"
        },
   ]

  const a = arr4.map((x) => x.name).flat();{
     console.log(a)
     res.send(a)
  }
   
});


router.get('/films/:id', function (req, res) {
   const value = req.params.id

   const arr = [
      {
         id: 1, 
         name: "The Shining"
        },
      {
         id: 2, 
         name: "lord of rings"
        },
      {
         id: 3, 
         name: "pk"
        },
      {
         id: 4, 
         name: "attack"
        },
   ]


 const arrlen = arr.length
 if (value < arrlen -1) {
    res.send(arr[value])
 } else {
    let str = "use a valid index"
    res.send(str)
 }

});


module.exports = router;
// adding this comment for no reason