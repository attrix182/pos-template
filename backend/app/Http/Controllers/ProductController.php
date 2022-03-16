<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    public function listAll()
    {
        $products = Product::all();
        if ($products) {
            return response()->json($products);
        }
        return response()->json(['message' => 'Product not available', 'code' => 404], 404);
    }


    public function listOne($id)
    {
        $product = new Product;
        $product =  Product::find($id);
        if ($product) {
            return response()->json($product);
        }
        return response()->json(['message' => 'Product not found', 'code' => 404], 404);
    }

    public function create(Request $data)
    {
        $product = new Product;

        $product->name = $data->name;
        $product->description = $data->description;
        $product->price = $data->price;
        $product->available = $data->available;

        if ($data->hasFile('img')) {
            $nameImg = $data->file('img')->getClientOriginalName();
            $newNameImg = $product->name;
            $folder = './productsImages';
            $data->file('img')->move($folder, $newNameImg);
        }

        $product->image = $newNameImg;

        $product->save();


        return response()->json($product, 200);
    }


    public function update(Request $data, $id)
    {

        $product = Product::find($id);
        $product->name = $data->name;
        $product->description = $data->description;
        $product->price = $data->price;
        $product->available = $data->available;

        if ($data->hasFile('img')) {
            $nameImg = $data->file('img')->getClientOriginalName();
            $newNameImg = $product->id;
            $folder = './upload';
            $data->file('img')->move($folder, $newNameImg);
        }

        $product->img = $newNameImg;

        $product->save();

        return response()->json($product);
    }

    public function delete($id)
    {
        $product = Product::find($id);
        $product->delete();
        $product->status = "Deleted";
        return response()->json($product->status);
    }
}
