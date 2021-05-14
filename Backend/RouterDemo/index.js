const express = require('express');
const app = express();
const shelterRoutes = require('./routes/shelters')
const dogRoutes = require('./routes/dogs')
const adminRoutes = require('./routes/admin')

// app.use((req, res, next) => {
//     if(req.query.isAdmin){
//         next()
//     }
//     res.send("SORRY NOT AN ADMIN!")
// })

// app.use('/', shelterRoutes);
// app.use('/shelters', shelterRoutes);
app.use('/breeders', shelterRoutes);
app.use('/dogs', dogRoutes);
app.use('/admin', adminRoutes);


app.listen(3000, () => {
    console.log("App listening on port 3000!")
})
