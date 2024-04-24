const express= require("express")
const app=express()
const port=process.env.PORT || 3000
const bodyParser=require("body-parser")

app.use(express.static('public'))

app.set('view engine','jsx')
app.engine('jsx',require('express-react-views').createEngine())

const sandwiches=require("./models/sandwiches")
const desserts=require("./models/desserts")
const comments=require("./models/comments")

const error=require("./utilities/error")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({extended:true}))

app.use((req,res,next)=>
{
    const time=new Date()
    console.log
    (
        `-----
        ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    )
    if(Object.keys(req.body).length>0)
    {
        console.log("Containing the data:")
        console.log(`${JSON.stringify(req.body)}`)
    }
    next()
})

app
    .route("/api/sandwiches")
    .get((req,res)=>
    {
        res.json(sandwiches)
    })

app
    .route("/api/sandwiches/:id")
    .get((req,res,next)=>
    {
        const sandwich=sandwiches.find((s)=>s.id==req.params.id)
        if(sandwich) res.json(sandwich)
        else next()
    })
    .patch((req,res,next)=>
    {
        const sandwich=sandwiches.find((s,i)=>
        {
            if(s.id==req.params.id)
            {
                for(const key in req.body)
                {
                    sandwiches[i][key]=req.body[key]
                }
                return true
            }
        })
        if(sandwich) res.json(sandwich)
        else next()
    })
    app
    .route("/api/sandwiches/:id/view")
    .get((req,res,next)=>
    {
        const sandwich=sandwiches.find((u)=>u.id==req.params.id)
        if(sandwich) res.render("Sandwiches",{sandwich})
        else next()
    })

app
    .route("/api/desserts")
    .get((req,res,next)=>
    {
        res.json(desserts)
    })

app
    .route("/api/desserts/:id")
    .get((req,res,next)=>
    {
        const dessert=desserts.find((u)=>u.id==req.params.id)
        if(dessert) res.json(dessert)
        else next()
    })
    .patch((req,res,next)=>
    {
        const dessert=desserts.find((d,i)=>
        {
            if(d.id==req.params.id)
            {
                for(const key in req.body)
                {
                    desserts[i][key]=req.body[key]
                }
                return true
            }
        })
        if(dessert) res.json(dessert)
        else next()
    })

app
    .route("/api/desserts/:id/view")
    .get((req,res,next)=>
    {
        const dessert=desserts.find((u)=>u.id==req.params.id)
        if(dessert) res.render("Desserts",{dessert})
        else next()
    })

app
    .route("/api/comments")
    .get((req,res,next)=>
    {
        res.json(comments)
    })
    .post((req,res)=>
    {
        if(req.body.name && req.body.content)
        {
            const comment=
            {
                name:req.body.name,
                content:req.body.content,
            }
            comments.push(comment)
            res.json(comments[comments.length-1])
        } else res.json({error:"Insufficient Data"})
    })

app
    .route("/api/comments/:indexOfCommentsArray")
    .get((req,res,next)=>
    {
        res.json(comments[req.params.indexOfCommentsArray])
    })
    .delete((req,res,next)=>
    {
        const comment=comments.find((c,i)=>
        {
            if(c.indexOfCommentsArray==req.params.indexOfCommentsArray)
            {
                comments.splice(i,1)
                return true
            }
        })
        if(comment) res.json(comment)
        else next()
    })

app
    .route("/api/comments/:indexOfCommentsArray/view")
    .get((req,res)=>
    {
        res.render("Comments",{comment:comments[req.params.indexOfCommentsArray]})
    })

app
    .route("/")
    .get((req,res,next)=>
    {
        res.json
        ({
            links: 
            [
                {
                    href: "/api",
                    rel: "api",
                    type: "GET",
                },
            ],
        });
    })

app
    .route("/api")
    .get((req,res,next)=>
    {
        res.json
        ({
            links:
            [
                {
                    href:"api/sandwiches",
                    rel:"sandwiches",
                    type:"GET",
                },
                {
                    href:"api/desserts",
                    rel:"desserts",
                    type:"GET",
                },
                {
                    href:"api/comments",
                    rel:"comments",
                    type:"GET",
                },
                {
                    href:"api/comments",
                    rel:"comments",
                    type:"POST",
                },
            ]
        })
    })

app.use((req,res,next)=> 
{
    next(error(404,"Resource Not Found"))
})

app.use((err,req,res,next)=>
{
    res.status(err.status || 500)
    res.json({error: err.message})
})

app.listen(port,()=>
{
    console.log(`Server is listening on port: ${port}.`)
})