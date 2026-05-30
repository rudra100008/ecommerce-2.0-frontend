"use client";

import { useProductWithInventoryWithImage } from "@/hooks/useProducts";
import { Pencil, Trash2, Eye, Plus, Package, TrendingUp, Layers, Tag, BarChart2 } from "lucide-react";

export default function AdminProductPage() {
  const {
    data: products,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useProductWithInventoryWithImage();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-surface">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-accent"></div>
          <p className="text-sm text-gray-400 font-medium">Loading products…</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-surface">
        <div className="bg-danger-light text-danger px-6 py-4 rounded-lg text-sm font-medium">
          Error loading products: {error?.message}
        </div>
      </div>
    );
  }

  const totalStock = products?.content?.reduce((sum, p) => sum + (p.inventory?.stockQuantity || 0), 0) || 0;
  const totalCategories = new Set(products?.content?.map(p => p.category?.name)).size || 0;
  const avgPrice = ((products?.content?.reduce((sum, p) => sum + p.price, 0) || 0) / (products?.content?.length || 1)).toFixed(0);

  const stats = [
    { label: "Total Products", value: products?.totalElement || 0, icon: Package, color: "text-info", bg: "bg-info-light" },
    { label: "Total Stock", value: totalStock.toLocaleString(), icon: BarChart2, color: "text-success", bg: "bg-success-light" },
    { label: "Categories", value: totalCategories, icon: Layers, color: "text-accent", bg: "bg-accent-light" },
    { label: "Avg. Price", value: `RsRs{avgPrice}`, icon: Tag, color: "text-warning", bg: "bg-warning-light" },
  ];

  return (
    <div className="p-6 bg-surface min-h-screen">

      {/* ── Page Header ── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-1 h-5 rounded-full bg-accent"></span>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Inventory</p>
            </div>
            <h1 className="text-3xl font-bold text-primary leading-tight">All Products</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage, monitor, and update your entire product catalog.
            </p>
          </div>
          <button className="btn-accent self-start sm:self-center flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* ── Stats Strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="stat-card flex items-center gap-4">
            <div className={`Rs{bg} Rs{color} p-2.5 rounded-lg shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="stat-label text-xs truncate">{label}</p>
              <p className="stat-value text-xl">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table Card ── */}
      <div className="card overflow-hidden p-0">

        {/* Card toolbar */}
        <div className="card-header flex items-center justify-between bg-white">
          <div>
            <h2 className="text-sm font-semibold text-primary">Product List</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {products?.totalElement || 0} total entries
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search products…"
              className="input w-44 text-xs py-1.5 px-3 h-8"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="table-header-cell pl-6">Product</th>
                <th className="table-header-cell">Price</th>
                <th className="table-header-cell">Discount</th>
                <th className="table-header-cell">Final</th>
                <th className="table-header-cell">Category</th>
                <th className="table-header-cell">Stock</th>
                <th className="table-header-cell text-center pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isSuccess && products?.content?.map((product, idx) => (
                <tr
                  key={product.productId}
                  className="table-row-hover group bg-white"
                >
                  {/* Product name */}
                  <td className="table-body-cell pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-gray-400 group-hover:bg-accent-light group-hover:text-accent transition-colors duration-150">
                        <Package className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-primary leading-tight">{product.name}</span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="table-body-cell text-gray-500">
                    Rs{product.price.toFixed(2)}
                  </td>

                  {/* Discount */}
                  <td className="table-body-cell">
                    {product.discount > 0 ? (
                      <span className="badge badge-success">−Rs{product.discount}</span>
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </td>

                  {/* Final price */}
                  <td className="table-body-cell">
                    <span className="font-bold text-primary">
                      Rs{(product.price - (product.discount || 0)).toFixed(2)}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="table-body-cell">
                    <span className="badge badge-info">
                      {product.category?.name || "Uncategorized"}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="table-body-cell">
                    {product.inventory?.stockQuantity > 10 ? (
                      <span className="badge badge-success">
                        ✓ {product.inventory.stockQuantity}
                      </span>
                    ) : product.inventory?.stockQuantity > 0 ? (
                      <span className="badge badge-warning">
                        ⚠ {product.inventory.stockQuantity}
                      </span>
                    ) : (
                      <span className="badge badge-danger">Out of Stock</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="table-body-cell pr-6">
                    <div className="flex items-center justify-center gap-1">
                      <button className="action-btn-view action-btn" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="action-btn-edit action-btn" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="action-btn-delete action-btn" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        {products && products.totalPages > 1 && (
          <div className="card-footer flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Showing <span className="font-semibold text-primary">{products.pageNumber * products.pageSize + 1}</span>
              {" "}–{" "}
              <span className="font-semibold text-primary">
                {Math.min((products.pageNumber + 1) * products.pageSize, products.totalElement)}
              </span>
              {" "}of{" "}
              <span className="font-semibold text-primary">{products.totalElement}</span> products
            </p>
            <div className="flex items-center gap-1.5">
              <button
                className="btn-outline px-3 py-1 text-xs rounded-lg"
                disabled={products.pageNumber === 0}
              >
                ← Prev
              </button>
              <span className="px-3 py-1 text-xs font-semibold bg-accent text-white rounded-lg">
                {products.pageNumber + 1}
              </span>
              <button
                className="btn-outline px-3 py-1 text-xs rounded-lg"
                disabled={products.lastPage}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Empty State ── */}
      {isSuccess && (!products?.content || products.content.length === 0) && (
        <div className="card text-center py-16 mt-4">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-base font-semibold text-primary mb-1">No Products Yet</h3>
          <p className="text-sm text-gray-500 mb-5">Get started by adding your first product to the catalog.</p>
          <button className="btn-accent mx-auto">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      )}
    </div>
  );
}