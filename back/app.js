import { createClient } from "@supabase/supabase-js";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const supabase = createClient(
  "https://bbrfovbvfzeszrjnhsdp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicmZvdmJ2Znplc3pyam5oc2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NjQwMDAsImV4cCI6MjAxNDI0MDAwMH0.m59kFNiMCInEjaQcC-v32YOJ4JolEwE9dJruivGi5FQ"
);

//cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//route qui renvoie les données de la table ITEM
app.get("/ITEM", async (req, res) => {
  const { data, error } = await supabase
    .from("ITEM")
    .select()
    .eq("status", true);
  res.send(data);
});

// route qui renvoie la donnée ID de la table ITEM
app.get("/ITEM/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("ITEM")
    .select("id")
    .eq("status", true);
  res.send(data);
});

export default app;
