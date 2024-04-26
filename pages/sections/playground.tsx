import Playground from '~/sections/Playground';

const data = {
    "title": "Discover the Coco & Eve playground",
    "moblie_title": "The Coco & Eve playground",
    "text": "<p><strong>We're totally coconuts about beauty!</strong></p><p>Which is why we have combined powerful & tropical ingredients into different ranges to provide amazing results and make your life feel like a constant holiday. <br>21 beauty awards. 100% vegan. Cruelty free.</p>",
    "range_1": {
        "id": 10,
        "Title": "Hair",
        "text": "Explore our hair range <br> to find all you’ll need for <br> perfect locks",
        "button_label": "Shop Hair",
        "button_link": "/collections/hair",
        "playground_range_bg": "bg-secondary-light",
        "image": {
            "id": 5690,
            "url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d32b6302-730c-4a75-df44-68902bb77100/public"
        },
        "image_mobile": {
            "id": 2901,
            "url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/b46544da-3a84-4309-363b-9778f9090000/public"
        }
    },
    "range_2": {
        "id": 11,
        "Title": "Tan & SPF",
        "text": "<p class=\"playground__subtitle mt-1\">Explore Tan &amp; SPF <br> for a safe &amp; sun-kissed glow!</p>",
        "button_label": "Shop Tan",
        "button_link": "/collections/tan",
        "playground_range_bg": "bg-yellow-light",
        "image": {
            "id": 5691,
            "url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e9285cc9-f4cc-49b2-a159-efd75a4b1800/public"
        },
        "image_mobile": {
            "id": 2903,
            "url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/33a889be-891d-4e4d-d04c-88ea7cbb3300/public"
        }
    },
    "range_3": {
        "id": 12,
        "Title": "Skin",
        "text": "Explore our antioxidant <br>skincare for a radiant glow",
        "button_label": "Shop Skin",
        "button_link": "/collections/skin",
        "playground_range_bg": "bg-secondary-light",
        "image": {
            "id": 5693,
            "url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/18b2e9f8-fc1f-4a03-8355-1b96f2205600/public"
        },
        "image_mobile": {
            "id": 5694,
            "url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c1820c74-44d7-4cd0-9e1d-273c32b6cc00/public"
        }
    },
    "range_4": {
        "id": 15,
        "Title": "Body",
        "text": "Explore Glow Figure. <br> It's Bali beauty for your <br class=\"d-none d-lg-block\"> bod",
        "button_label": "Shop Body",
        "button_link": "/collections/body",
        "playground_range_bg": "bg-primary-light-second",
        "image": {
            "id": 5692,
            "url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/7c000358-bae4-4d76-8d67-5172ce932500/public"
        },
        "image_mobile": {
            "id": 2905,
            "url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/10d3f2b0-a667-4606-4c9c-05f3cec3ac00/public"
        }
    }
};
const PlaygroundSection = () => {
    return (
        <Playground content={data} isStyleguide={true} />
    );
}

export default PlaygroundSection;
