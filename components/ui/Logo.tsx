import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center mt-5">  
        <div className="relative w-full h-40">
            <Image
                priority
                fill
                alt="Logotipo Fresh Coffee"
                src='/logo.svg'
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
    </div>
  )
}
