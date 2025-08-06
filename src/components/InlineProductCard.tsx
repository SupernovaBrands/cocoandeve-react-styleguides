import PlusCircle from '~/images/icons/plus-circle.svg';

const InlineProductCard = (props: any) => {
    const { product } = props;
    return product && (
        <figure className="p-[.5rem] bg-gray-400 rounded-[1.25rem] mt-[.75rem] grid grid-cols-[68px_auto_40px] gap-[1rem] items-center">
            <a href={`/products/${product.handle}`}>
                <img width={68} height={64} className="rounded-[.5rem]" src={product.src.replace('public', '86x')} />
            </a>
            <div className="flex flex-col justify-between">
                <p className="text-sm mb-[.5rem]">{product.title}</p>
                <div className="flex">
                    {product.comparePrice && <span className="line-through mr-[.25rem] text-gray-500">{product.comparePrice}</span>}
                    <span className="font-bold">{product.price}</span>
                </div>
            </div>
            <button disabled={product.availableForSale} className="h-4 w-4" type="button">
                <PlusCircle className={`svg fill-primary hover:fill-primary-dark h-full w-full ${product.availableForSale ? '' : 'opacity-[.5]'}`} />
            </button>
        </figure>
    );
};

export default InlineProductCard;