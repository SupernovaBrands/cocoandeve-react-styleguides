import Testimonial from '@/sections/Testimonial';

const Editors = () => {
    return (
        <div className="container list-logo pt-4 pb-4 text-center">
            <p className="h1 mb-1">Beauty editors love us</p>
            <div className="flex flex-row flex-wrap mx-auto items-center">
                <Testimonial 
                    src="//cdn.shopify.com/s/files/1/0286/1327/9779/files/nylon_logo_2x_53a0aefa-88f7-40dc-9ba2-c5a76d20509b_medium.png?v=1593581750"
                    srcset="//cdn.shopify.com/s/files/1/0286/1327/9779/files/nylon_logo_2x_53a0aefa-88f7-40dc-9ba2-c5a76d20509b_medium.png?v=1593581750"
                >
                </Testimonial>
                <Testimonial 
                    src="//cdn.shopify.com/s/files/1/0286/1327/9779/files/Cosmopolitan_logo_2x_f6470180-7e31-4d14-b92f-50dc54fa5507_medium.png?v=1593581961"
                    srcset="//cdn.shopify.com/s/files/1/0286/1327/9779/files/Cosmopolitan_logo_2x_f6470180-7e31-4d14-b92f-50dc54fa5507_medium.png?v=1593581961"
                >
                </Testimonial>
                <Testimonial 
                    src="//cdn.shopify.com/s/files/1/0286/1327/9779/files/Elle_logo_2x_10778af1-7bd5-42f1-a04f-e13f3a1ad4e8_medium.png?v=1593581961"
                    srcset="//cdn.shopify.com/s/files/1/0286/1327/9779/files/Elle_logo_2x_10778af1-7bd5-42f1-a04f-e13f3a1ad4e8_medium.png?v=1593581961"
                >
                </Testimonial>
                <Testimonial 
                    src="//cdn.shopify.com/s/files/1/0286/1327/9779/files/Glamour_2x_68be7813-2fe0-41cf-9649-caaf859f2530_medium.png?v=1593581961"
                    srcset="//cdn.shopify.com/s/files/1/0286/1327/9779/files/Glamour_2x_68be7813-2fe0-41cf-9649-caaf859f2530_medium.png?v=1593581961"
                >
                </Testimonial>
                <Testimonial 
                    src="//cdn.shopify.com/s/files/1/0286/1327/9779/files/refinery-29-jecca-makeup-_2x_b58b06be-bd94-4e9b-b907-7cc492578c09_medium.png?v=1593568919"
                    srcset="//cdn.shopify.com/s/files/1/0286/1327/9779/files/refinery-29-jecca-makeup-_2x_b58b06be-bd94-4e9b-b907-7cc492578c09_medium.png?v=1593568919"
                >
                </Testimonial>
                <Testimonial 
                    src="//cdn.shopify.com/s/files/1/0286/1327/9779/files/Mail_online_logo_2x_76e10089-d01a-486c-aa16-ea4c0c24a6ad_medium.png?v=1593581961"
                    srcset="//cdn.shopify.com/s/files/1/0286/1327/9779/files/Mail_online_logo_2x_76e10089-d01a-486c-aa16-ea4c0c24a6ad_medium.png?v=1593581961"
                >
                </Testimonial>
            </div>
        </div>
    )
}

export default Editors;