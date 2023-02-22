const getfrontend = async (req,res)=>
{
    res.render('frontend')
}
const getbackend = async (req,res)=>
{
     res.render('backend')
}
const getcloud = async (req,res)=>
{
        res.render('cloud')
}
const getuiux = async (req,res)=>
{
       res.render('uiux')
}
const getflutter = async (req,res)=>
{
       res.render('flutter')
}
const getReact = async (req,res)=>
{
     res.render('react')

}
const getAngular = async (req,res)=>
{
     res.render('Angular')
}
const getdsa = async (req,res)=>
{
    res.render('dsa')
}
module.exports = {
    getfrontend,
    getAngular,
    getReact,
    getbackend,
    getcloud,
    getflutter,
    getuiux,
    getdsa
}