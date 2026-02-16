import { Link } from "react-router-dom";

const Offers = () => {
  const offers = [
    { id: 1, company: "HDFC Bank", rate: "10%" },
    { id: 2, company: "ICICI Bank", rate: "11%" },
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Available Loan Offers</h1>

      <div className="grid grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-semibold">
              {offer.company}
            </h2>
            <p className="my-2">Interest Rate: {offer.rate}</p>

            <Link
              to={`/client/apply/${offer.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Apply Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;