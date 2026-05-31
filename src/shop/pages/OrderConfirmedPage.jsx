import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Download, FileText } from "lucide-react";

export default function OrderConfirmedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  useEffect(() => {
    if (!orderData) {
      navigate("/shop", { replace: true });
    }
  }, [navigate, orderData]);

  if (!orderData) return null;

  const {
    orderId,
    purchaseDate,
    purchaseTime,
    paymentMethod,
    items = [],
    shippingAddress,
    subtotal = 0,
    discountAmount = 0,
    shipping = 0,
    tax = 0,
    total = 0,
    confirmationEmail,
  } = orderData;

  const hasDigitalItems = items.some((item) => item.type === "digital");
  const hasPhysicalItems = items.some((item) => item.type === "merchandise");

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount || 0);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="hover:text-gray-700">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/shop" className="hover:text-gray-700">Shop</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">Order confirmation</li>
          </ol>
        </nav>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Order confirmed</h1>
            <p className="text-gray-600">Thank you for your purchase</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-green-700">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Payment successful</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">ORDER DETAILS</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <Detail label="Order no." value={orderId} />
                <Detail label="Purchase date" value={formatDate(purchaseDate)} />
                <Detail label="Purchase time" value={purchaseTime} />
                <Detail label="Payment method" value={paymentMethod} />
              </div>
            </section>

            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">ITEMS PURCHASED</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.artist || "Unknown artist"}</p>
                      <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                      <span
                        className={`mt-2 inline-block rounded px-3 py-1 text-xs font-medium ${
                          item.type === "digital"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.type === "digital" ? "Digital download" : "Physical item"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {hasPhysicalItems && shippingAddress && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">SHIPPING ADDRESS</h2>
                <div className="space-y-1 text-sm text-gray-700">
                  <p className="font-semibold">{shippingAddress.fullName}</p>
                  <p>{shippingAddress.address}</p>
                  <p>{shippingAddress.city} {shippingAddress.postalCode}</p>
                </div>
              </section>
            )}

            {hasDigitalItems && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">DOWNLOAD YOUR MUSIC</h2>
                <p className="mb-4 text-sm text-gray-600">Download links are also sent to your email.</p>
                <div className="space-y-3">
                  {items
                    .filter((item) => item.type === "digital")
                    .map((item) => (
                      <div key={item.id} className="space-y-2">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <div className="flex flex-wrap gap-3">
                          <button className="flex items-center gap-2 rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
                            <Download className="h-4 w-4" />
                            Download all (MP3)
                          </button>
                          <button className="flex items-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                            <Download className="h-4 w-4" />
                            Download all (FLAC)
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}
          </div>

          <aside>
            <div className="space-y-6 lg:sticky lg:top-8">
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">ORDER SUMMARY</h2>
                <div className="space-y-3 text-sm">
                  <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
                  {discountAmount > 0 && (
                    <SummaryRow label="Discount" value={`-${formatCurrency(discountAmount)}`} valueClassName="text-green-700" />
                  )}
                  {shipping > 0 && <SummaryRow label="Shipping" value={formatCurrency(shipping)} />}
                  {tax > 0 && <SummaryRow label="Tax (VAT 7%)" value={formatCurrency(tax)} />}
                  <div className="flex justify-between border-t pt-3 text-base font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">{formatCurrency(total)}</span>
                  </div>
                </div>
              </section>

              <section className="rounded-lg bg-blue-50 p-6">
                <h2 className="mb-2 text-sm font-semibold text-gray-900">CONFIRMATION SENT TO</h2>
                <p className="mb-2 text-sm font-medium text-gray-900">{confirmationEmail}</p>
                <p className="text-xs text-gray-600">Check spam if not received within 5 mins</p>
              </section>

              <div className="space-y-3">
                <Link
                  to="/shop"
                  className="block w-full rounded-lg bg-indigo-600 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  Continue shopping
                </Link>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                  <FileText className="h-4 w-4" />
                  Download receipt (PDF)
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="mb-1 text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value, valueClassName = "text-gray-900" }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
}
