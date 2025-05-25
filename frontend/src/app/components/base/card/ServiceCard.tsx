import Link from 'next/link';

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Link href={`/services/${service.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <service.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold ml-4">{service.name}</h3>
          </div>
          <p className="text-gray-600">{service.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;