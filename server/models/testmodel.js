import mongoose from "mongoose";

const Schema = mongoose.Schema;

const testSchema = new Schema(
    {
        mykey: String
    }
);

const testmodel = mongoose.model('testdata', testSchema);

export default testmodel