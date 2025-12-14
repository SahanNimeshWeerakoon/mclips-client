export default function CropRatios() {
    return (
        <div className="w-full flex items-end">
            <button className="mr-10 border rounded px-5 py-5">1:1</button>
            <button className="mr-10 border rounded px-8 py-6">4:3</button>
            <button className="mr-10 border rounded px-3 py-9">1:3</button>
        </div>
    );
}