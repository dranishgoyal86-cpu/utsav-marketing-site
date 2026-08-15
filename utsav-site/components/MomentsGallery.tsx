import Image from "next/image";

type Slot = {
  id: string;
  src: string;
  caption: string;
  span?: string;
};

const SLOTS: Slot[] = [
  {
    id: "mandap",
    src: "/photos/mandap.jpg",
    caption: "The wedding ceremony",
    span: "sm:row-span-2",
  },
  {
    id: "birthday",
    src: "/photos/birthday.jpg",
    caption: "Birthday celebrations",
  },
  {
    id: "sangeet",
    src: "/photos/sangeet.jpg",
    caption: "Dancing till late",
  },
  {
    id: "gifts",
    src: "/photos/gifts.jpg",
    caption: "Gifts, tracked and returned",
  },
  {
    id: "reception",
    src: "/photos/reception.jpg",
    caption: "Reception night",
    span: "sm:row-span-2",
  },
  {
    id: "procession",
    src: "/photos/procession.jpg",
    caption: "Every tradition, honoured",
  },
];

export default function MomentsGallery() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:grid-rows-2">
      {SLOTS.map((slot) => (
        <div
          key={slot.id}
          className={`group relative min-h-[160px] overflow-hidden rounded-2xl border border-border ${slot.span ?? ""}`}
        >
          <Image
            src={slot.src}
            alt={slot.caption}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0"
          />
          <p className="absolute bottom-3 left-3.5 right-3.5 text-sm font-semibold text-white drop-shadow-sm">
            {slot.caption}
          </p>
        </div>
      ))}
    </div>
  );
}
