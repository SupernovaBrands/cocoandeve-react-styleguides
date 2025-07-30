import PlusCircle from '~/images/icons/plus-circle.svg';

const InlineProductCard = (props: any) => {
    return (
        <figure className="p-[.5rem] bg-gray-400 rounded-[1.25rem] mt-[.75rem] grid grid-cols-[68px_auto_40px] gap-[1rem] items-center">
            <img width={68} height={64} className="rounded-[.5rem]" src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3c7df021-d5c2-43d2-16c3-604e2ce4a300/86x" />
            <div className="flex flex-col justify-between">
                <p className="text-sm mb-[.5rem]">Sunny Honey Bali Bronzing Set</p>
                <div className="flex">
                    <span className="line-through mr-[.25rem] text-gray-500">S$390</span>
                    <span className="font-bold">S$139</span>
                </div>
            </div>
            <button className="h-4 w-4" type="button">
                <PlusCircle className="svg fill-primary hover:fill-primary-dark h-full w-full" />
            </button>
        </figure>
    );
};

export default InlineProductCard;