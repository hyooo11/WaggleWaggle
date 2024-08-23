import dynamic from "next/dynamic";
const Store = dynamic(() => import("@/component/store/Store"), {
  ssr: false,
});

const StorePage = () => {
  return (
    <div>
      <Store />
    </div>
  );
};

export default StorePage;
