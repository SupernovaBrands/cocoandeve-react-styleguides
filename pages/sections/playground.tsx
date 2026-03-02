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
            "url": "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_108d79ab-434a-490a-9899-e6ce42c3775d.jpg?v=1772001007"
        },
        "image_mobile": {
            "id": 2901,
            "url": "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_061f8ac1-5a03-487a-9d95-67b1e0b927c2.png?v=1772001040"
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
            "url": "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_fbdfbdf3-77c2-41b8-a305-1a4ede73c923.jpg?v=1772001151"
        },
        "image_mobile": {
            "id": 2903,
            "url": "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_566a27e7-7c2c-4acc-8aa0-4d84cf197a95.png?v=1772001176"
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
            "url": "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_1157da21-6280-4649-bf61-d34d0978a2e0.jpg?v=1772001208"
        },
        "image_mobile": {
            "id": 5694,
            "url": "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_83aef349-e782-41f7-8a1f-a06c1955093c.jpg?v=1772001240"
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
            "url": "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_d21d7566-d555-4650-bb75-0732296d9129.jpg?v=1772001281"
        },
        "image_mobile": {
            "id": 2905,
            "url": "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_303a7172-f49a-4a1b-8bb2-f11d32ca6640.png?v=1772001316"
        }
    }
};
const PlaygroundSection = () => {
    return (
        <Playground content={data} isStyleguide={true} />
    );
}

export default PlaygroundSection;
