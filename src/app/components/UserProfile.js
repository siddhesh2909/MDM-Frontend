import Image from "next/image";
function UserProfile() {
    return (
      <div className="flex gap-5 justify-between self-center mt-96 max-w-full w-[223px] max-md:mt-10">
        <div className="px-5 py-7 text-3xl font-medium text-center text-sky-700 whitespace-nowrap rounded-full bg-zinc-100 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          WV
          <br />
        </div>
        <div className="flex flex-col justify-center px-4 py-3.5 rounded-full bg-zinc-100 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <Image loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a1437d1d13b0d2d2ba61d79539bdc62b67659bc0ab4948353ea703c28c0fb9f?placeholderIfAbsent=true&apiKey=c65deb9a8c8e4dacb9ff8d9c2ccdd566" alt="User profile icon" className="object-contain aspect-[1.11] w-[52px]" />
        </div>
      </div>
    );
  }
  export default UserProfile;