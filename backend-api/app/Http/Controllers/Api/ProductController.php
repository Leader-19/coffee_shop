<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        try {
            $products = Product::all();
            return response()->json([
                'message' => 'Products retrieved successfully',
                'data' => $products,
                'status' => true
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve products',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('products', 'public');
                $validated['image'] = $path;
            }

            $product = Product::create($validated);

            return response()->json([
                'message' => 'Product created successfully',
                'product' => $product
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Product creation failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $product = Product::findOrFail($id);
            return response()->json([
                'message' => 'Product retrieved successfully',
                'product' => $product
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Product not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($product->image) {
                    Storage::disk('public')->delete($product->image);
                }
                $path = $request->file('image')->store('products', 'public');
                $validated['image'] = $path;
            }

            $product->update($validated);

            return response()->json([
                'message' => 'Product updated successfully',
                'product' => $product
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Product update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            
            // Delete associated image
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            
            $product->delete();

            return response()->json([
                'message' => 'Product deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Product deletion failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}