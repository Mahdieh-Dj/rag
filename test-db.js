import Database from "better-sqlite3";
import * as sqliteVec from "sqlite-vec";

const db = new Database("test.db");

sqliteVec.load(db);

console.log("sqlite-vec loaded");
