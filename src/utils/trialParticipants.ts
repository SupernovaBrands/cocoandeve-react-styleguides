const trialParticipants = [
	{
		sku: 'CE0001602020',
		date: '2023-9-19',
		title: 'Soft, hydrated and clean skin!',
		user: 'Brooke A.',
		score: '4',
		content: 'The seed oil cleanser did an amazing job cleaning off any makeup and impurities I had on throughout the day! It feels a little heavy when you put it on at first but it leaves your skin feeling soft, hydrated and clean!',
	},
	{
		sku: 'CE0001612020',
		date: '2023-9-19',
		title: 'My face LOVED this',
		user: 'Brooke A.',
		score: '4',
		content: 'Pairing the Enzyme Cleansers with the Seed Oil Cleanser is a beautiful match. The Fruit Enzyme cleanser worked to get rid of any excess oil while making sure the good nutrients stayed. The fruit enzyme cleanser felt like a soft exfoliant to help rid any dead skin cells adding to the softness and refreshed feeling my face loved! My skin felt soft, glowy and supple and renewed after!',
	},
	{
		sku: 'CE0001612025',
		date: '2023-9-19',
		title: 'A beautiful match!',
		user: 'Brooke A.',
		score: '4',
		content: 'The seed oil cleanser did an amazing job cleaning off any makeup and impurities I had on throughout the day! It feels a little heavy when you put it on at first but it leaves your skin feeling soft, hydrated and clean! The Fruit Enzyme cleanser worked to get rid of any excess oil while making sure the good nutrients stayed. The fruit enzyme cleanser felt like a soft exfoliant to help rid any dead skin cells adding to the softness and refreshed feeling my face loved! My skin felt soft, glowy and supple and renewed after!',
	},
	{
		sku: 'CE0002712020',
		date: '2023-9-19',
		title: 'The toner worked beautifully as a finishing step!',
		user: 'Brooke A.',
		score: '4',
		content: 'It solidified all of the nutrients that came with both of the cleansers in the previous step. It felt like a hydrating and glowing shield of protection. ',
	},
	{
		sku: 'CE0001612026',
		date: '2023-9-19',
		title: 'My skin loved these products! ',
		user: 'Brooke A.',
		score: '4',
		content: 'Together, they left my skin soft, glowy and supple. I must say, the Seed Oil Cleanser with the Enzyme Cleanser are a beautiful match.  They cleansed any makeup and impurities I had on and also provided gentle exfoliation, leaving my skin feeling refreshed! ',
	},
	{
		sku: 'CE0001602020,CE0001612020,CE0002712020,CE0001612025,CE0001612026',
		date: '2023-9-15',
		title: 'Two words: instant glow.',
		user: 'Chelsi D.',
		score: '5',
		content: 'From bland and rough, my skin had gone supple, smooth, and glowy in an instant. I started noticing results in a week, and a huge difference in my skin texture and complexion in two. Check out that rosy tint on my cheeks! I’m hooked!',
	},
	{
		sku: 'CE0001602020,CE0001612020,CE0002712020,CE0001612025,CE0001612026',
		date: '2023-9-18',
		title: 'Calmed my enzema!',
		user: 'Alexandra E.',
		score: '5',
		content: "After a few days I started to see my eczema calm and the redness subdued, giving my face a less 'angry' appearance. The happiest result being that I was able to put makeup around my nose again without it appearing flakey!",
	},
	{
		sku: 'CE0001602020',
		date: '2023-9-9',
		title: 'The Seed Oil Cleanser worked so well!',
		user: 'Melanie V.',
		score: '5',
		content: "I couldn't believe how clean and moisturized my skin felt after using it! It is definitely going to be a staple in my daily skincare routine.",
	},
	{
		sku: 'CE0001612020',
		date: '2023-9-9',
		title: 'Made my skin incredibly soft!',
		user: 'Melanie V.',
		score: '4',
		content: 'With sensitve skin, I avoid exfoliating daily but I do plan on using it 2 to 3 times a week because it paired so well with the other products. It would feel like a crime not to use it!',
	},
	{
		sku: 'CE0001612025',
		date: '2023-9-9',
		title: 'A staple in my daily skincare routine!',
		user: 'Melanie V.',
		score: '5',
		content: "I couldn't believe how clean and moisturized my skin felt after using the Seed Oil Cleanser! With sensitive skin, I avoid exfoliating daily but I do plan on using ithe Fruit Enzyme Cleanser 2 to 3 times a week because it paired so well with the other products. It would feel like a crime not to use it!",
	},
	{
		sku: 'CE0002712020',
		date: '2023-9-9',
		title: 'Smooth soft skin!',
		user: 'Melanie V.',
		score: '4',
		content: 'It kept my skin bright, plump, and soft, and I noticed my fine lines and texture disappearing with every use. ',
	},
	{
		sku: 'CE0001612026',
		date: '2023-9-9',
		title: 'Absolutely AMAZING!',
		user: 'Melanie V.',
		score: '4',
		content: 'With every use, I noticed my fine lines and texture disappearing. It kept my skin bright, plump, and soft. I’d say that these products are going to be a staple in my daily skincare routine and it would feel like a crime to pass on them!',
	},
	{
		sku: 'CE0001602020',
		date: '2023-9-15',
		title: 'Will definitely carry on using this!',
		user: 'Melissa R.',
		score: '5',
		content: 'A nice light weight cleanser that removed all of my makeup effortlessly and left my skin hydrated and non greasy.',
	},
	{
		sku: 'CE0001612020',
		date: '2023-9-15',
		title: 'A lovely cleanser!',
		user: 'Melissa R.',
		score: '5',
		content: 'Left my skin feeling hydrated and looking brighter and smoother. A little bit goes a long way with this cleanser and I will definitely carry on using it.',
	},
	{
		sku: 'CE0001612025',
		date: '2023-9-15',
		title: 'I will definitely carry on using it!',
		user: 'Melissa R.',
		score: '5',
		content: 'The Seed Oil Cleanser is a nice light weight cleanser that removed all of my makeup effortlessly and left my skin hydrated and non greasy. For the Fruit Enzyme Cleanser, a little bit goes a long way with this cleanser. It left my skin feeling hydrated and looking brighter and smoother. I will definitely carry on using it!',
	},
	{
		sku: 'CE0002712020',
		date: '2023-9-15',
		title: 'Completely smooths out the skin',
		user: 'Melissa R.',
		score: '5',
		content: 'You only need a few drops of this toner and it makes my skin feel refreshed and hydrated and ready for the rest of your skin care routine. It also helps calm any redness you might have. One of my favourite toners my pores appear reduced and it left the perfect base for my makeup.',
	},
	{
		sku: 'CE0001612026',
		date: '2023-9-15',
		title: 'Definitely carry on using these products!',
		user: 'Melissa R.',
		score: '5',
		content: 'The Seed Oil Cleanser effortlessly removes makeup, leaving my skin hydrated and non-greasy. The Fruit Enzyme Cleanser adds brightness and smoothness to my complexion with just a little product. As for the Milky Toner, a few drops are all it takes to smooth and refresh my skin, reducing redness and creating the ideal canvas for makeup.',
	},
	{
		sku: 'CE0001602020,CE0002532020,CE0002532040',
		date: '2024-1-2',
		title: 'AMAZED by the result',
		user: 'Claire H.',
		score: '4',
		content: "In just a couple of washes, I had visibly less dandruff, fewer red patches and my scalp felt much calmer. This clarifying detox shampoo lathered up really well and my hair definitely felt cleaner and soft. I will be adding the shampoo to my routine as it has worked wonders on my scalp and I'd absolutely recommend this to anyone looking for similar benefits!",
	},
	{
		sku: 'CE0001602020,CE0002532020,CE0002532040',
		date: '2024-1-5',
		title: 'Felt like a salon-grade shampoo!',
		user: 'Melissa R.',
		score: '5',
		content: "I love this shampoo! I didn’t realise how much product had built up in my hair and how heavy my hair felt until I used this. I just used a small amount but my hair felt lighter and softer than it had in a while. With other shampoos, I sometimes feel like I'm unable to get all the product completely out of my hair but this product made me feel like I had just washed my hair with salon-grade shampoo. My hair felt fully refreshed and I can’t wait to see how healthy my hair looks after continued use. ",
	},
	{
		sku: 'CE0001602020,CE0002532020,CE0002532040',
		date: '2024-1-9',
		title: 'Curly-hair approved!',
		user: 'Raquel B.',
		score: '4',
		content: 'I loved the feeling it gave me after washing my hair! I use a lot of creams due to my curls and it gets really greasy so it was such a nice feeling to have clean airy hair! ',
	},
	{
		sku: 'CE0001602020,CE0002532020,CE0002532040',
		date: '2024-1-9',
		title: 'I’m CONVERTED',
		user: 'Erin',
		score: '5',
		content: 'I have NEVER used a clarifying shampoo but I’m converted! 😍 it smells amazing - Hibiscus and Lemon Heaven! It’s so lightweight and you get a super deep clean! 😍 I panicked a little at rinse time but after following up with you fave conditioner or hair treatment (I used both Coco & Eve Like a Virgin conditioner and on my 2nd wash Coco & Eve Like a Virgin Mask 😉) Absolutely Stella! ❤️🙌🏻  If you haven’t already, BUY IT ASAP! 💕',
	},
	{
		sku: 'CE0001602020,CE0002532020,CE0002532040',
		date: '2024-1-10',
		title: 'Definitely a new staple in my hair care routine. ',
		user: 'Mady F.',
		score: '5',
		content: 'I wash my hair once a week during the winter season. With dry shampoo and heat protectant being my daily use, it creates a bunch of build up in my scalp and strands. Coco and Eve clarifying detox shampoo cleansed my week-old hair and brought a brand new canvas to work on! My hair was soft, light and completely refreshed.',
	},
	{
		sku: 'CE0001602020,CE0002532020,CE0002532040',
		date: '2024-1-11',
		title: 'Noticeable difference in just TWO WASHES',
		user: 'Stephanie D.',
		score: '5',
		content: "Since the original Like a Virgin Mask launched, I have longed for a gentle clarifying shampoo to pair with it. Hard water and heavy metals are a big issue where I live and now I'm so happy because this shampoo does a great job lifting away product residue, natural build-up, and everyday pollutants. It feels like cleansing my scalp with a fluffy scented cloud. In just two washes, I can already notice a difference in shine, curl definition and weightlessness.",
	},
	{
		sku: 'CE0001602020,CE0002532020,CE0002532040',
		date: '2024-1-11',
		title: 'My new go-to!',
		user: 'Caitlin S.',
		score: '5',
		content: "I have been looking for a new clarifying and detoxing shampoo for a while now and I think I've just found my new go-to! more and recommending it to others too!",
	},
	{
		sku: 'CE0001602020,CE0002532020,CE0002532040',
		date: '2024-1-11',
		title: 'Allows other hair products to work better',
		user: 'Candice G.',
		score: '4',
		content: 'I have bleached and very damaged hair but the detox shampo helped clean away any nasties and allowed other hair products to work better. I found that my hair really absorbed the hair mask better. It definitely made my hair and scalp feel cleansed!',
	},
	{
		sku: 'CE0001602020,CE0002532020,CE0002532040',
		date: '2024-1-18',
		title: 'Truely Magic!',
		user: 'Elena',
		score: '5',
		content: "Usually if I go a few days without washing my hair, I have to shampoo twice to get a clean feeling, but with this clarifying shampoo, I only had to use it once! And it didn't make my hair feel like straw after, truly magic. ",
	},
	{
		sku: 'CE0001622020',
		date: '2024-3-12',
		title: 'Said goodbye to my oily skin and enlarged pores!',
		user: 'Isabella Ferrazzano',
		score: '5',
		content: 'I love how smooth this cream is, it makes my skin look airbrushed. I love that I can get glowy skin without using a thick heavy cream that leaves a greasy residue. Obsessed with this glow cream. I will definitely be incorporating this into my everyday skincare routine. ',
	},
	{
		sku: 'CE0001622020',
		date: '2024-3-13',
		title: 'My skin has NEVER felt this soft before',
		user: 'Caitlin Allen ',
		score: '4',
		content: "I've struggled to find somthing hydrating that doesn't worsen breakouts or leave my oily skin feeling sticky, but this one ticks all the boxes! I use it under my makeup every day and before bed, and it keeps my makeup looking flawless while also feeling great on my skin. Highly recommend giving it a try!",
	},
	{
		sku: 'CE0001622020',
		date: '2024-3-13',
		title: 'The Antioxidant Glow Cream lives up to its name!',
		user: 'Kayla Ashworth',
		score: '5',
		content: "It leaves your skin with a beautiful glow. If you're searching for a face cream that not only makes your skin smooth but also gives it that radiant glow, look no further. This is the product to buy!! ",
	},
	{
		sku: 'CE0002722020',
		date: '2024-3-20',
		title: 'Smooth and rich BUT feels lightweight',
		user: 'Francesca ',
		score: '5',
		content: 'I was a bit scared I would have an allergic reaction as I do with many products but this cream was suprisingly good. This cream absorbs fast, is rich but at the same time lightweight. I really enjoyed using it and will most likely keep using it as part of my routine.',
	},
	{
		sku: 'CE0002722020',
		date: '2024-3-21',
		title: 'Soothes irritation and depuffs!',
		user: 'Merinda Kennedy',
		score: '5',
		content: "It's a lovely texture, and glides on easily. Definitely feels like it takes away the irritation after washing off makeup and reduces puffiness around my eyes.",
	},
	{
		sku: 'CE0002722020',
		date: '2024-3-25',
		title: 'Love how it feels on skin!',
		user: 'Abbey Reed',
		score: '5',
		content: "I'm really enjoy the texture of this eye cream and how nice it feels upon application and afterwards. Excited to keep using it to see if the results keep getting better!",
	},
	{
		sku: 'CE0004122020',
		date: '2024-4-11',
		title: 'Amazing face tan serum!',
		user: 'Ashlee',
		score: '5',
		content: "So easy to use, doesn't transfer and dries quickly. You can see results within an hour too. Would definitely buy and recommend!",
	},
	{
		sku: 'CE0004122020',
		date: '2024-4-18',
		title: 'Everything it claims to be and more!',
		user: 'Nattali Ashurst',
		score: '5',
		content: 'The softest feeling on your skin, paired with the prettiest, natural, sun-kissed glow!! A must-add to your daily routine \u{1FAF6}🏼',
	},
	{
		sku: 'CE0004122020',
		date: '2024-4-15',
		title: 'Easy to use & fast results!',
		user: 'Beth',
		score: '5',
		content: 'Really easy to use and starts to work super quickly. It smells nice and the color doesn’t transfer. Worth it for that sun-kissed look!',
	},
	{
		sku: 'CE0004122020',
		date: '2024-4-18',
		title: 'LOVE this product',
		user: 'Klariza Clayton',
		score: '5',
		content: "It smells amazing, is lightweight and doesn't feel heavy on my skin. The fact that it is vegan and cruelty-free is also a massive plus!",
	},
	{
		sku: 'CE0004122020',
		date: '2024-4-14',
		title: 'Would 10/10 recommend!',
		user: 'Kaya Mähliß',
		score: '5',
		content: 'Loved it! It gives me a sun-kissed glow and makes my skin feel super smooth! I would 10/10 recommend it to my friends!',
	},
	{
		sku: 'CE0004122020',
		date: '2024-4-15',
		title: 'Perfect addition to a skincare routine!',
		user: 'Stephanie Nadalini',
		score: '5',
		content: 'Not only do you get the benefit of a beautiful, natural sun-kissed glow, but it also packs an anti-aging punch with niacinamide and polyglutamic acid, all wrapped up in the perfect pink bundle!',
	},
	{
		sku: 'CE0004122020',
		date: '2024-4-16',
		title: 'EXACTLY what I was looking for.',
		user: 'Stacey MacDonald',
		score: '5',
		content: 'As someone who doesn’t tan often, I wanted a tanning serum that was easy to apply, looked natural and didn’t leave me with streaky patches. This serum was exactly that! It was easy to apply and the natural look was just what I was looking for. It’s great that you can add a bit every other day to keep it looking fresh too. ',
	},
	{
		sku: 'CE0004122020',
		date: '2024-4-15',
		title: 'Self-tan with skincare benefits!',
		user: 'Leandra Scaccia',
		score: '5',
		content: 'Such an easy product to use to help naturally tan your face, while also providing anti-aging skincare benefits!',
	},
	{
		sku: 'CE0004122020',
		date: '2024-4-18',
		title: 'Fabulous self-tan for the face!',
		user: 'Alexis Solheim',
		score: '5',
		content: 'Not only tans but actually makes your skin look better! I used this product for five days and it gave my skin a healthy sun-kissed glow. It doesn’t feel greasy and goes on evenly. I never looked blotchy and the color is very natural, even on my light skin. I will definitely be incorporating this product into my daily summer routine.',
	},
	{
		sku: 'CE0004122020',
		date: '2024-4-14',
		title: 'Perfect for lighter skin tone!',
		user: 'Dannielle Costello',
		score: '5',
		content: 'It works perfectly with moisturizer to create an even tan! Definitely part of my daily routine for a beautiful tan year-round.',
	},
	{
		sku: 'CE0004122020',
		date: '2024-4-13',
		title: 'FAST RESULTS!',
		user: 'Mary Markley Klosa',
		score: '4',
		content: 'Gave me a nice glow in less than 10 hours!',
	},
	{
		sku: 'CE0004122020',
		date: '2024-4-18',
		title: 'PERFECT',
		user: 'Francesca Amadio',
		score: '5',
		content: 'It’s very easy to blend and doesn’t leave orange tones!',
	},
	{
		sku: 'CE0004152020',
		date: '2024-5-12',
		title: 'LOVE IT',
		user: 'Dannielle Costello',
		score: '5',
		content: "Using this leave-in treatment leaves my hair feeling nourished. It's effortless to brush through before styling and there's no oily residue. My hair feels stronger too!",
	},
	{
		sku: 'CE0004152020',
		date: '2024-5-11',
		title: 'Miraculous leave-in treatment',
		user: 'Melissa',
		score: '5',
		content: 'This leave-in treatment works wonders! Initially, I was skeptical about its moisturizing capabilities without using conditioner, which is usually my go-to. However, just a small amount goes a long way in moisturizing and repairing the hair. It effectively repairs damages and tames frizz without leaving any greasy residue!',
	},
	{
		sku: 'CE0004152020',
		date: '2024-5-11',
		title: 'My new favourite leave-in!',
		user: 'Felicia Sheesley',
		score: '5',
		content: "This leave-in treatment has won me over! With its sweet coconut scent and amazing feel, it's become my top pick. Plus, it leaves my hair super soft without any greasiness. Give it a try—you won't regret it!",
	},
	{
		sku: 'CE0004152020',
		date: '2024-5-10',
		title: 'Healthy, smooth and frizz-free locks',
		user: 'Naomi Chee',
		score: '5',
		content: "My hair feels and looks incredibly healthy! Most of the frizz is gone and it's much more smoother.",
	},
	{
		sku: 'CE0004152020',
		date: '2024-5-7',
		title: 'Surprising results!',
		user: 'Zoe Ashford',
		score: '5',
		content: "With my long hair, I thought this wouldn't cut it, as I usually load up on conditioner. But following the instructions, I brushed my hair post-shower without conditioner—OMG, it worked! Just 2 pumps of the leave-in treatment did the trick perfectly. Unlike others I've tried, it didn't leave any sticky residue, and my hair felt light and clean.",
	},
	{
		sku: 'CE0004152020',
		date: '2024-5-1',
		title: 'Surpassed all expectations',
		user: 'Mady',
		score: '5',
		content: 'My hair has the tendency to dry out without a heavy moisturizing conditioner. Even with one, it still tends to be dry. However, to my delight, this treament surpassed all expectations, leaving my hair silky and beautifully wavy!',
	},
	{
		sku: 'CE0004152020',
		date: '2024-5-1',
		title: 'Exceptional moisturizing effect',
		user: 'Elena',
		score: '4',
		content: 'Initially hesitant to skip my usual conditioner, I found this product to be incredibly moisturizing, especially for my ends. It provided a level of softness similar to a hair mask!',
	},
	{
		sku: 'CE0004152020',
		date: '2024-4-30',
		title: 'Fantastic product!',
		user: 'Samantha',
		score: '5',
		content: 'I absolutely adore this product! The scent is delightful and it leaves my hair feeling super soft and looking healthier than ever.',
	},
	{
		sku: 'CE0004152020',
		date: '2024-4-30',
		title: 'OBSESSED',
		user: 'Erin',
		score: '4',
		content: "I'm obsessed with this treatment! It's such a game-changer! I was skeptical about skipping conditioner, but honestly, this treatment delivers all the benefits of heavy-duty conditioning without any product buildup!",
	},
	{
		sku: 'CE0001572020,CE0001582020,CE0003922020',
		date: '2024-5-19',
		title: 'Fantastic Duo!',
		user: 'Amanda Lopez',
		score: '5',
		content: 'I truly loved the Repairing & Restoring Shampoo! It lathered well, smelled delicious and left no residue. The conditioner is one of my new favorites. My hair was shiny, smooth and moisturized for days, with less frizz. Excited for long-term results!',
	},
	{
		sku: 'CE0001572020,CE0001582020,CE0003922020',
		date: '2024-5-19',
		title: 'Luxe lather & silky smooth results',
		user: 'Juliette Dean',
		score: '5',
		content: 'The shampoo lathers easily, leaving the scalp clean and hair soft. The conditioner detangles effortlessly, leaving hair silky smooth in just 3 minutes!\n',
	},
	{
		sku: 'CE0001572020,CE0001582020,CE0003922020',
		date: '2024-5-19',
		title: 'Gentle on damaged hair!',
		user: 'Michelle',
		score: '5',
		content: 'This shampoo & conditioner set is amazing for damaged hair! Noticeably less stripping with a lovely pink hue. It left my hair silkier, softer, and less tangled than before.',
	},
	{
		sku: 'CE0001572020,CE0001582020,CE0003922020',
		date: '2024-5-18',
		title: 'A Perfect Pair',
		user: 'Ingrid Wise',
		score: '5',
		content: 'Leaving my hair feeling both nourished and cleansed, the shampoo effectively removes all buildup. The luxurious conditioner, effortlessly tames frizz, delivering amazing results, especially in humid climates like FNQ!',
	},
	{
		sku: 'CE0001572020,CE0001582020,CE0003922020',
		date: '2024-5-18',
		title: 'A must-have for dry, aging hair!',
		user: 'Anna Nelson',
		score: '4',
		content: 'With just a small amount, the shampoo creates a delightful lather, leaving my hair smelling divine. The conditioner felt more like a hydrating hair mask that restored luster without weighing it down.',
	},
	{
		sku: 'CE0001572020,CE0001582020,CE0003922020',
		date: '2024-5-18',
		title: 'Perfect for hair color enthusiasts!',
		user: 'Molly Reynolds ',
		score: '5',
		content: 'The shampoo breathed life back into my dull, damaged hair, offering salon-quality results. The conditioner is creamy and luxurious, with a nostalgic scent.',
	},
	{
		sku: 'CE0001572020,CE0001582020,CE0003922020',
		date: '2024-5-18',
		title: 'Transformed My Curls',
		user: 'Stephanie Dieter',
		score: '5',
		content: 'This Shampoo and Conditioner left my hair feeling light, airy and restored to a healthy state. My curls, often plagued by damage, tangles, and frizz, have never been softer, more moisturized, or healthier. This routine is significantly superior to others I’ve tried. Highly recommend for curly-haired people and those who use chemicals occasionally. This routine also enhances styling results!',
	},
	{
		sku: 'CE0001572020,CE0001582020,CE0003922020',
		date: '2024-5-18',
		title: 'Unbelievably Soft Hair!',
		user: 'Robyn ',
		score: '5',
		content: 'My hair is unbelievably soft after using this set! Definitely going to continue using it',
	},
	{
		sku: 'CE0001572020,CE0001582020,CE0003922020',
		date: '2024-5-17',
		title: ' Softer, Shinier, Healthier Hair!',
		user: 'Sarah Thompson ',
		score: '5',
		content: 'My hair incredibly soft, shiny and frizz-free after using the shampoo. It lathers well, smells great and leaves no residue, making my scalp feel healthier. The Conditioner makes my hair smooth, silky and easy to detangle. It has a lovely scent, doesn’t weigh my hair down and adds a beautiful shine, making my hair look healthier overall. Highly recommend giving them a try!',
	},
	{
		sku: 'CE0001572020,CE0001582020,CE0003922020',
		date: '2024-5-10',
		title: 'AMAZING SCENT',
		user: 'Chelsea',
		score: '4',
		content: 'I found the shampoo cleansing and nourishing, reducing oiliness and adding volume. Its conditioner counterpart left my hair smooth, moisturized, with improved split ends and fewer tangles!',
	},
	{
		sku: 'CE0001572020,CE0001582020,CE0003922020',
		date: '2024-5-8',
		title: 'Refreshing Cleanse, Hydrating Bliss!',
		user: 'Chloe Tierney',
		score: '5',
		content: 'My hair feels thoroughly cleansed with no residual oil on my scalp and the scent is beautiful! It feels sleeker and hydrated, with soft ends and a reduction in split ends. Would definitely incorportate this set into my routine.',
	},
	{
		sku: 'CE0001572020,CE0001582020,CE0003922020',
		date: '2024-5-7',
		title: 'Revitalizing Shampoo & Luxe Conditioner',
		user: 'Isabella Ferrazzano',
		score: '5',
		content: 'After using this shampoo, I was amazed at how clean and nourished my hair and roots felt, despite my damaged hair. The conditioner softened my hair, reduced frizz and nourished split ends, with a luxurious texture and phenomenal scent. Will definitely continue using!',
	},
	{
		sku: 'CE0001572020,CE0001582020,CE0003922020',
		date: '2024-5-2',
		title: 'Shiny soft locks',
		user: 'Nicole Lynch',
		score: '5',
		content: 'I adore the Sweet Repair shampoo for its thorough cleansing yet gentle touch, leaving my hair feeling great. The Sweet Repair Conditioner has a delightful scent and deep conditioning effect that leaves my hair soft and shiny.',
	},
	{
		sku: '',
		date: '2024-05-19',
		title: 'Sensational Shampoo',
		user: 'Amanda Lopez',
		score: 5,
		content: 'Truly loved the Sweet Repair shampoo! Lathered well, smelled delicious, and was easy to wash out, leaving no residue.',
	},
	{
		sku: '',
		date: '2024-05-17',
		title: 'Silky smoothness!',
		user: 'Juliette Dean',
		score: 5,
		content: 'The shampoo lathers easily and distributes well through hair. Scalp felt clean and hair felt soft and smooth afterward.',
	},
	{
		sku: '',
		date: '2024-05-19',
		title: 'Perfect for damaged hair',
		user: 'Michelle',
		score: 5,
		content: 'Amazing shampoo for damaged hair, noticeably not as stripping as others. Gorgeous slight pink color 💖',
	},
	{
		sku: '',
		date: '2024-05-18',
		title: 'Shampoo Magic!',
		user: 'Ingrid Wise',
		score: 5,
		content: 'This shampoo feels nourishing yet clarifying. Removed all buildup from spray, leave-in conditioners, and dry shampoo!',
	},
	{
		sku: '',
		date: '2024-05-18',
		title: 'Luscious Lather',
		user: 'Anna Nelson',
		score: 4,
		content: 'Only a small amount is needed for a delightful lather. Easy to work through hair, smells divine - even got compliments that my ‘hair smelt nice!’',
	},
	{
		sku: '',
		date: '2024-05-18',
		title: 'Revived my dull, damaged hair! ',
		user: 'Molly Reynolds ',
		score: 5,
		content: 'Beautifully packaged product that delivers salon-quality results!',
	},
	{
		sku: '',
		date: '2024-05-18',
		title: 'Works wonders on curls',
		user: 'Stephanie Dieter',
		score: 5,
		content: 'Left my hair feeling light, airy, and restored to a healthy state. Highly recommend for curly-haired people!',
	},
	{
		sku: '',
		date: '2024-05-18',
		title: 'Unbelievable results',
		user: 'Robyn ',
		score: 5,
		content: 'Hair is unbelievably soft after using this without being greasy!! Definitely going to continue using this.',
	},
	{
		sku: '',
		date: '2024-05-19',
		title: 'Boosts shine!',
		user: 'Sarah Thompson ',
		score: 5,
		content: "The Sweet Repair shampoo was amazing. Hair feels incredibly soft and looks shinier than ever. Lathers well, pleasant scent, and doesn't leave any residue.",
	},
	{
		sku: '',
		date: '2024-05-10',
		title: 'This shampoo smells amazing!',
		user: 'Chelsea',
		score: 4,
		content: ' Made my hair feel clean and nourished. My hair normally gets oily after a couple days but after using this, it didn’t get oily as quick. Feels thicker with more volume too!',
	},
	{
		sku: '',
		date: '2024-05-08',
		title: 'Thorough cleanse',
		user: 'Chloe Tierney',
		score: 5,
		content: 'Hair feels thoroughly cleansed with no residual oil on the scalp. Smells beautiful too!',
	},
	{
		sku: '',
		date: '2024-05-07',
		title: 'Results in 1 use!',
		user: 'Isabella Ferrazzano',
		score: 5,
		content: 'Shocked after using this shampoo! My hair and roots felt so cleansed, amazing! With damaged hair and split ends, it feels super nourished and visibly hydrated even after just one use!',
	},
	{
		sku: '',
		date: '2024-05-02',
		title: 'Adore it!!',
		user: 'Nicole Lynch',
		score: 5,
		content: 'Thoroughly cleansing yet leaves my hair feeling great!',
	},
	{
		sku: 'CE0004192020,CE0005062020',
		date: '2024-6-4',
		title: 'Radiant and moisturized glow',
		user: 'Cassandra ',
		score: '4',
		content: 'The Coco and Eve Antioxidant Glow shimmer body oil gives the most beautiful, sparkly glow. You will be left with a perfect, even sheen and look radiant while wearing it! I like that it’s moisturizing and gives a beautiful glow to my body',
	},
	{
		sku: 'CE0004192020,CE0005062020',
		date: '2024-6-4',
		title: 'Perfect Summer Shimmer',
		user: 'Zendilli Depina',
		score: '5',
		content: 'This will be my go-to product all summer! Great smell, easy to apply, doesn’t feel sticky or greasy and makes my body shimmer! Pretty packaging.',
	},
	{
		sku: 'CE0004192020,CE0005062020',
		date: '2024-6-3',
		title: 'Subtle Shimmer and Hydration',
		user: 'Lindsay',
		score: '4',
		content: "It didn't make my skin look any darker, just added a shimmer that can be seen in the sunlight. I like that it is ingredient-conscious and hydrates the skin.",
	},
	{
		sku: 'CE0004192020,CE0005062020',
		date: '2024-6-3',
		title: 'Golden Glow for Silky Smooth Summer Skin 🌞',
		user: 'Aitana López ',
		score: '5',
		content: 'I adore the radiant effect it gives, leaving my skin feeling silky smooth, perfect for summer. It is not greasy, spreads very well on the skin and gives a young, healthy appearance. The skin looks juicy, shiny, satiny and soft. I love the golden color. It reminds me of sunsets in Ibiza.',
	},
	{
		sku: 'CE0004192020,CE0005062020',
		date: '2024-6-3',
		title: 'Light and Easy Extra Glow',
		user: 'Mary Klosa',
		score: '4',
		content: 'Light and easy to throw on for an extra glow. Subtle sparkle.',
	},
	{
		sku: 'CE0004192020,CE0005062020',
		date: '2024-5-31',
		title: 'Perfectly Balanced SHIMMER and Scent!',
		user: 'Kirsten',
		score: '4',
		content: 'The smell is amazing! I also like the shimmer because it’s not too much.',
	},
	{
		sku: 'CE0004192020,CE0005062020',
		date: '2024-5-28',
		title: 'Immediate Glow for Fair Skin',
		user: 'Lindsay Jo Moore ',
		score: '4',
		content: 'I really enjoyed this product simply because it gave me an immediate glow to my skin. Having very fair skin, it was simple and easy to apply before throwing on a cute summer dress. It definitely made my skin soft and while wearing it out in public, I received a compliment saying that they liked the natural look of it.',
	},
	{
		sku: 'CE0004192020,CE0005062020',
		date: '2024-5-28',
		title: 'Daily Routine Must-Have 💫',
		user: 'Samantha Richards',
		score: '5',
		content: 'I love the way that this body oil smells. I use body oil regularly and this one I will be incorporating into my daily routine. It has a nice subtle shimmer, it absorbs quickly and doesn’t leave you oily. I applied it on my body after the shower because it smells that good. I love how easily it applies.',
	},
	{
		sku: 'CE0004192020,CE0005062020',
		date: '2024-5-26',
		title: 'Enchanting Shimmer and Lovely Scent',
		user: 'Lindsey Morrison',
		score: '4',
		content: 'This shimmer body oil gave me an enchanting glow! It has a delightful scent as well.',
	},
	{
		sku: 'CE0004192020,CE0005062020',
		date: '2024-5-26',
		title: 'LONG-LASTING and Amazing Scent!',
		user: 'Valerie',
		score: '4',
		content: 'I really loved the way this oil didn’t leave me feeling greasy and it felt amazing on my skin. I had a nice shimmer and it smells AMAZING!',
	},
	{
		sku: 'CE0004192020,CE0005062020',
		date: '2024-5-25',
		title: 'Fast-absorbing and delightfully scented',
		user: 'Kathleen Kirkman ',
		score: '4',
		content: 'I absolutely loved being able to try the shimmer body oil. I love the fast-acting absorbency and how it smells. I would absolutely recommend this to any of my friends. I love the way it sparkles ✨️',
	},
	{
		sku: 'CE0004192020,CE0005062020',
		date: '2024-06-03',
		title: 'Divine Smell and Long-Lasting Shimmer',
		user: 'Marisa Cesario',
		score: 4,
		content: 'This shimmer oil smells divine, is easy to apply and leaves my skin looking glowing and radiant. The shimmer is long-lasting too!',
	},
	{
		sku: 'CE0004192020,CE0005062020',
		date: '2024-06-02',
		title: 'Soft Glow and Wonderful Smell',
		user: 'Madalena bruschy',
		score: 5,
		content: "I love the product! It has a wonderful smell, a soft moisturizing texture without being greasy. It leaves a soft glow, which is perfect for me as it doesn't get too shiny. It will definitely be part of my summer routine! ",
	},
	{
		sku: 'CE0004192020,CE0005062020',
		date: '2024-06-02',
		title: 'Highly recommend!',
		user: 'anna hwang',
		score: 5,
		content: 'Love that it is very light on the skin, easily absorbed and non-greasy. It made my dry skin smooth and shimmery. The smell is also heavenly. I would highly recommend it!',
	},
	{
		sku: 'CE0004142020,CE0005352020,CE0005362020,CE0005372020',
		date: '2024-7-24',
		title: 'Amazing Results You Have to Try!',
		user: 'Chanel Arbour',
		score: '5',
		content: 'I love the smell and the texture of the Resurfacing Body Gel Scrub. It feels great to scrub all parts of my body without scratching or irritating the skin. This product is truly amazing and I highly recommend it for everyone to try!\n\n',
	},
	{
		sku: 'CE0004142020,CE0005352020,CE0005362020,CE0005372020',
		date: '2024-7-23',
		title: 'Heavenly Scent and Baby Soft Skin!',
		user: 'Wendy Van Craen',
		score: '5',
		content: 'This product is truly amazing! My skin feels baby soft and hydrated after using it. An extra bonus is that it smells heavenly. With AHA and BHA, the exfoliation is effective yet gentle on the skin. Even my legs, which sometimes have dry patches, feel soft, silky, and hydrated.',
	},
	{
		sku: 'CE0004142020,CE0005352020,CE0005362020,CE0005372020',
		date: '2024-7-23',
		title: 'Effortless Exfoliation with a Fruity Fragrance\n',
		user: 'Rachel Tones',
		score: '4',
		content: "The Resurfacing Body Gel Scrub is an easy way to incorporate regular exfoliation into your routine. The gel texture and fine exfoliating particles move seamlessly across damp skin, leaving it softer and more supple after use. The fruity fragrance is a lovely feature that matches the rest of the Coco & Eve range. If you follow with Body Moisture Whip, you don't need to add a fragrance to stay fresh throughout the day.",
	},
	{
		sku: 'CE0004142020,CE0005352020,CE0005362020,CE0005372020',
		date: '2024-7-23',
		title: 'Gentle Hydrating Scrub',
		user: 'Bruna Grochot ',
		score: '5',
		content: "It's easy to use, has a nice fragrance and rinses well. Left my skin very soft and hydrated, without feeling dry or sensitive.",
	},
	{
		sku: 'CE0004142020,CE0005352020,CE0005362020,CE0005372020',
		date: '2024-7-19',
		title: 'Gentle and Effective!',
		user: 'Zendilli Depina',
		score: '5',
		content: 'I love how soft the Resurfacing Body Gel Scrub makes my skin and how it isn’t super abrasive. The scent is subtle and doesn’t overpower my other bath items. A little goes a long way and it doesn’t leave a sticky or heavy residue, making it great to use before shaving!',
	},
	{
		sku: 'CE0004142020,CE0005352020,CE0005362020,CE0005372020',
		date: '2024-7-17',
		title: 'Smooth, Soft Skin with a Delightful Scent',
		user: 'Cat ',
		score: '5',
		content: 'This gel scrub was really easy to use and smelled amazing. I was really happy with the product and will definitely add it to my skincare routine. It leaves my skin really smooth and soft right after the first use.',
	},
];

export default trialParticipants;
