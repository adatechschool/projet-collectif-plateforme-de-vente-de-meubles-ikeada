import {createClient} from '@supabase/supabase-js';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const supabase = createClient('https://bbrfovbvfzeszrjnhsdp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicmZvdmJ2Znplc3pyam5oc2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NjQwMDAsImV4cCI6MjAxNDI0MDAwMH0.m59kFNiMCInEjaQcC-v32YOJ4JolEwE9dJruivGi5FQ');

//cors
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Check toutes les requètes du BO avant de les traiter
    app.use('/admin/*', checkAuth, (req, res, next) => {
        next();
      });

  app.get("/admin/items", async (req, res) => {
    const {data, error} = await supabase.from('ITEM').select()
    if (error) {
        res.send(error);
    };
    res.send(data);
  })

  app.get("/admin/color", async (req, res) => {

    const {data:testData, error:testError} = await supabase.rpc('test_authorization_header')
    console.log(`The user role is ${testData.role} and the user UUID is ${testData.sub}. `,testError)

    try {
      const { data, error } = await supabase.from('COLOR').select();
      if (error) {
        throw error;
      }
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching colors:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // func pour checker le token des requetes sur le BO
  function checkAuth(req, res, next) {
    // Recupère l' access token du header de la requète
    const token = req.headers.authorization.split(' ')[1]

    try {
      // Verifie le token avec la clef secrète
      const decoded = jwt.verify(token, 'YTzJl/+pHrxr6BZkR+KA12wyrqhVvgl8lmuBX58oXZNKRc4JrmDOX1TrdgJB0jGazXmmzi7s0A/rqpg9TOQJ9g==')
      req.userData = decoded
      console.log(decoded)
      next()
    } catch (err) {
      return res.status(401).json({
        message: 'Auth failed'
      })
    }
  }

export default app;