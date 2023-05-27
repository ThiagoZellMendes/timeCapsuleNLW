import Image from "next/image";
import nlwLogo from "../../assets/logo.svg";
import Link from "next/link";

export function Hero() {
  return (
    <div className="space-y-5">
      <Image src={nlwLogo} alt="NLW Spacetime" />

      <div className="max-w-[420px] space-y-1">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="leading-relaxed text-ls">
          colecione momentos marcantes da sua joganda e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <Link
        className="inline-block px-5 py-3 text-sm leading-none text-black uppercase bg-green-500 rounded-full font-alt hover:bg-green-600"
        href="/memories/new"
      >
        CADASTRAR LEMBRANÇA
      </Link>
    </div>
  );
}
