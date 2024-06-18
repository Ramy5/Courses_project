interface PersonView_TP {
  img: string;
  desc: string;
}

const PersonView = ({ img, desc }: PersonView_TP) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 overflow-hidden rounded-full w-36 h-36">
        <img
          src={img}
          alt="Swiper item"
          className="object-cover w-full h-full"
        />
      </div>
      <p className="w-8/12 text-center">{desc}</p>
    </div>
  );
};

export default PersonView;
