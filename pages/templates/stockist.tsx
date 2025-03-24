import dynamic from 'next/dynamic';
import Header from '~/sections/Header';
import StockistTemplate from '~/templates/Stockist';
import Footer from '~/sections/Footer';
import Instagram from '~/sections/Instagram';
import Service from '~/sections/Service';
// import Cart from "~/components/cart/cart";
import { useEffect, useState } from 'react';
import { annBar, timerBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';
const Cart = dynamic(() => import('~/components/cart/cart'), {
    ssr: false,
});

const stockistTemplate = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const content = {
		desc: "<p>If we don't stock near you, you can buy online <a class='text-underline' href='/' title='/'>here</a> and take advantage of our worldwide delivery</p>",
		id: 1,
		label_title: "Choose your region:",
		question_note: "No worries, you can email us: wholesale@cocoandeve.com",
		stockist: [
			{
				"id": 98,
				"name": "Asos",
				"logo_url": "https://www.asos.com/women/face-body/a-to-z-of-brands/coco-eve/cat/?cid=28100",
				"title": "Available Online",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 4752,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/868ae11a-753e-46c1-645e-035930df2800/public"
				}
			},
			{
				"id": 97,
				"name": "Cult Beauty",
				"logo_url": "https://www.cultbeauty.co.uk/coco-eve",
				"title": "Available online",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 4753,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/cc3861a7-09fa-43ca-3865-f6e4461f5400/public"
				}
			},
			{
				"id": 99,
				"name": "Selfridges",
				"logo_url": "https://www.selfridges.com/SG/en/cat/coco-eve/",
				"title": "Available online & in stores",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 4754,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d0495d94-c7f5-417c-7210-6feb49b9dd00/public"
				}
			},
			{
				"id": 101,
				"name": "Pretty little thing",
				"logo_url": "https://www.prettylittlething.com/beauty/brands/coco-eve.html",
				"title": "Available online",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 4755,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/60a5fea0-5782-4555-9d68-d464c21f2c00/public"
				}
			},
			{
				"id": 100,
				"name": "Oliver Bonas",
				"logo_url": "https://www.oliverbonas.com/beauty/coco-and-eve",
				"title": "Available online & in select stores",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 4768,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f636572c-e9ca-465d-da9c-eb5494170800/public"
				}
			},
			{
				"id": 102,
				"name": "Beauty Bay",
				"logo_url": "https://www.beautybay.com/l/cocoeve/",
				"title": "Available online",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 4769,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/394cafba-7e17-4656-1c38-d4416b973f00/public"
				}
			},
			{
				"id": 103,
				"name": "Harvey nichols",
				"logo_url": "https://www.harveynichols.com/int/brand/coco-and-eve/",
				"title": "Available online & in select stores",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 4770,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/b84c2a5a-ca5f-4350-7007-4075cd8ec600/public"
				}
			},
			{
				"id": 106,
				"name": "Ulta",
				"logo_url": "https://www.ulta.com/brand/coco-eve",
				"title": "Available online",
				"country_tag": "usa",
				"logo": {
					"id": 4761,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3353bb93-78ba-4b1d-1775-3648218da100/public"
				}
			},
			{
				"id": 107,
				"name": "Revolve",
				"logo_url": "https://www.revolve.com/coco-eve/br/499065/",
				"title": "Available online",
				"country_tag": "usa",
				"logo": {
					"id": 4762,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e4572d50-27af-41de-0a5c-abf26066c200/public"
				}
			},
			{
				"id": 108,
				"name": "Myer",
				"logo_url": "https://www.myer.com.au/b/Coco%20%26%20Eve",
				"title": "Available online & in select stores",
				"country_tag": "australia",
				"logo": {
					"id": 4763,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/5318a2a7-cae0-465b-bd7d-16189ddbd200/public"
				}
			},
			{
				"id": 109,
				"name": "Adore beauty",
				"logo_url": "https://www.adorebeauty.com.au/coco-and-eve.html",
				"title": "Available online",
				"country_tag": "australia",
				"logo": {
					"id": 4764,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/089971b9-5263-4522-e69e-bd68e1c98200/public"
				}
			},
			{
				"id": 110,
				"name": "Sephora",
				"logo_url": "https://www.sephora.fr/marques/de-a-a-z/coco-et-eve-coco/",
				"title": "Available online",
				"country_tag": "europe",
				"logo": {
					"id": 4750,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/5c1a3d71-db22-4bb5-cdf5-245d84f41d00/public"
				}
			},
			{
				"id": 112,
				"name": "Douglas",
				"logo_url": "https://www.douglas.de/Coco-%26-Eve/index_b5709.html",
				"title": "Available online",
				"country_tag": "europe",
				"logo": {
					"id": 4759,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/049686dd-0fe1-4871-a8b8-6483eaf16300/public"
				}
			},
			{
				"id": 113,
				"name": "Sephora",
				"logo_url": "https://www.sephora.sg/brands/coco-and-eve",
				"title": "Available online & in select stores",
				"country_tag": "asia",
				"logo": {
					"id": 4750,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/5c1a3d71-db22-4bb5-cdf5-245d84f41d00/public"
				}
			},
			{
				"id": 114,
				"name": "Priceline",
				"logo_url": "https://www.priceline.com.au/brand/coco-and-eve/",
				"title": "Available online & in stores",
				"country_tag": "australia",
				"logo": {
					"id": 4765,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c18e2a69-e051-4748-88a4-68937782b900/public"
				}
			},
			{
				"id": 116,
				"name": "Flaconi",
				"logo_url": "https://www.flaconi.de/coco-and-eve/",
				"title": "Available online",
				"country_tag": "europe",
				"logo": {
					"id": 4757,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/b946ec6d-efac-45eb-6b30-c761e85f4d00/public"
				}
			},
			{
				"id": 117,
				"name": "Zalando",
				"logo_url": "https://zalando.de/coco-and-eve/",
				"title": "Available online",
				"country_tag": "europe",
				"logo": {
					"id": 4758,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f6c14595-7edf-4f03-ffa7-9786ed4b8500/public"
				}
			},
			{
				"id": 118,
				"name": "Niche beauty",
				"logo_url": "https://www.niche-beauty.com/en-de/brands/coco-eve-723",
				"title": "Available online",
				"country_tag": "europe",
				"logo": {
					"id": 4771,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/5d34aa9f-4ecd-4447-333a-469a625de000/public"
				}
			},
			{
				"id": 119,
				"name": "Namshi",
				"logo_url": "https://en-ae.namshi.com/women/coco_eve/",
				"title": "Available online",
				"country_tag": "asia",
				"logo": {
					"id": 4751,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/60f37ec3-0161-4c0e-f8e8-747e85667300/public"
				}
			},
			{
				"id": 120,
				"name": "Amazon",
				"logo_url": "https://www.amazon.com/stores/page/3198FC34-B198-484E-9205-0A3A89771520",
				"title": "Available online",
				"country_tag": "usa,united-kingdom,asia",
				"logo": {
					"id": 4772,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/cdd32c1a-88a7-43e6-10c0-77b6af36a900/public"
				}
			},
			{
				"id": 121,
				"name": "Chatters",
				"logo_url": "https://chatters.ca/collections/coco-eve",
				"title": "Available online & in store",
				"country_tag": "canada",
				"logo": {
					"id": 4766,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f81bed7d-37f1-4f95-d44d-b86465cc4b00/public"
				}
			},
			{
				"id": 147,
				"name": "Capello Pro",
				"logo_url": "https://www.capellopro.com/linea/coco-eve.html",
				"title": "Available online & in stores",
				"country_tag": "europe",
				"logo": {
					"id": 5761,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/eb4f2539-e90b-4ba2-ea5f-c38e8b1f1e00/public"
				}
			},
			{
				"id": 148,
				"name": "Matas",
				"logo_url": "https://www.matas.dk/coco-eve",
				"title": "Available online",
				"country_tag": "europe",
				"logo": {
					"id": 5762,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/9b1c826a-b90e-4fa3-8f13-717f1b367d00/public"
				}
			},
			{
				"id": 149,
				"name": "Nocibe",
				"logo_url": "https://www.nocibe.fr/coco-eve/C-510087",
				"title": "Available online",
				"country_tag": "europe",
				"logo": {
					"id": 5763,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/886e801b-dade-4081-0a70-1d9ce5530400/public"
				}
			},
			{
				"id": 150,
				"name": "Lyko",
				"logo_url": "https://lyko.com/sv/coco--eve?fromsearch=coco+%26+eve",
				"title": "Available online & in select stores",
				"country_tag": "europe",
				"logo": {
					"id": 5772,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/00a21cba-615c-451a-cbd7-acae5a169700/public"
				}
			},
			{
				"id": 151,
				"name": "Pinalli",
				"logo_url": "https://www.pinalli.it/collections/coco-eve-3366",
				"title": "Available online & in select stores",
				"country_tag": "europe",
				"logo": {
					"id": 5773,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/39abcc3e-e7e1-4173-f8ca-8ef024529700/public"
				}
			},
			{
				"id": 152,
				"name": "H&M",
				"logo_url": "https://www2.hm.com/no_no/beauty/brands/coco-eve.html",
				"title": "Available online & in select stores",
				"country_tag": "europe",
				"logo": {
					"id": 5774,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/908f9e4e-1bd2-444a-638c-258230b69d00/public"
				}
			},
			{
				"id": 153,
				"name": "Place Des Tendances",
				"logo_url": "https://beaute-printemps.placedestendances.com/fr/fr/coco-et-eve-beaute?query=coco%20%26%20Eve",
				"title": "Available online",
				"country_tag": "europe",
				"logo": {
					"id": 5775,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/dd366b49-bc8f-44a7-a9cc-1d1b306f4200/public"
				}
			},
			{
				"id": 154,
				"name": "Makeup Poland",
				"logo_url": "https://makeup.pl/brand/2506596/",
				"title": "Available online",
				"country_tag": "europe",
				"logo": {
					"id": 5776,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/67070ae2-f073-462c-6e9f-e57c1184c900/public"
				}
			},
			{
				"id": 155,
				"name": "Import Parfumerie",
				"logo_url": "https://www.impo.ch/de/coco-eve/c/BRAND_coco___eve",
				"title": "Available online & in select stores",
				"country_tag": "europe",
				"logo": {
					"id": 5777,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c685bfe9-9274-4321-e0b5-1bab23066600/public"
				}
			},
			{
				"id": 156,
				"name": "Notino",
				"logo_url": "https://www.notino.cz/coco-eve/",
				"title": "Available online & in select stores",
				"country_tag": "europe",
				"logo": {
					"id": 5778,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/6efb55f2-60b4-4a59-c90f-af1d7d15c400/public"
				}
			},
			{
				"id": 157,
				"name": "La Boutique du Coiffeur",
				"logo_url": "https://www.laboutiqueducoiffeur.com/fr-fr/marques/coco-and-eve",
				"title": "Available online & in select stores",
				"country_tag": "europe",
				"logo": {
					"id": 5779,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/8814340b-5830-4229-46c6-549021602400/public"
				}
			},
			{
				"id": 158,
				"name": "Anthropologie",
				"logo_url": "https://www.anthropologie.com/en-ca/brands/coco-eve",
				"title": "Available online & in select stores",
				"country_tag": "usa,canada",
				"logo": {
					"id": 5780,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/4daed11c-0e84-423e-6938-3726f4eeff00/public"
				}
			},
			{
				"id": 159,
				"name": "eCosmetics",
				"logo_url": "https://www.ecosmetics.com/brand/coco-eve/",
				"title": "Available online",
				"country_tag": "usa",
				"logo": {
					"id": 5781,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/fbef2dc0-f61d-417b-aaef-28bbae77d800/public"
				}
			},
			{
				"id": 160,
				"name": "ASOS US",
				"logo_url": "https://www.asos.com/us/women/face-body/a-to-z-of-brands/coco-eve/cat/?cid=28100",
				"title": "Available online",
				"country_tag": "usa",
				"logo": {
					"id": 5782,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c9c48fe9-58ae-40fe-b39f-3e0877875b00/public"
				}
			},
			{
				"id": 161,
				"name": "Boots",
				"logo_url": "https://www.boots.com/SearchDisplay?sType=SimpleSearch&pageId=1603259&categoryId=&pageView=&showResultsPage=true&beginIndex=0&searchSource=Q&resultCatEntryType=2&pageSize=24&manufacturer=Coco+%26+Eve&storeId=11352&isA2ZBrand=Y",
				"title": "Available online & in select stores",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 5783,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/75410f3b-a1f3-4dd0-f9e0-1469d90df800/public"
				}
			},
			{
				"id": 162,
				"name": "Just my Look",
				"logo_url": "https://www.justmylook.com/coco-eve-m641",
				"title": "Available online",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 5784,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e1a4d670-2d15-4e9e-48da-42903f3d0d00/public"
				}
			},
			{
				"id": 163,
				"name": "Sephora UK",
				"logo_url": "https://www.sephora.co.uk/brands/coco-and-eve?q=COCO+AND+EVE&q_typ=f",
				"title": "Available online & in stores",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 5785,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/cd0f2f4d-d189-4c77-90ec-14c0dcf75500/public"
				}
			},
			{
				"id": 164,
				"name": "Lookfantastic",
				"logo_url": "https://www.lookfantastic.com/brands/coco-eve.list",
				"title": "Available online",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 5786,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/4127afc3-8aaa-4d48-aef7-c8195deab500/public"
				}
			},
			{
				"id": 165,
				"name": "John lewis",
				"logo_url": "https://www.johnlewis.com/brand/beauty/coco-eve/_/N-a30Zo2o1",
				"title": "Available online & in select stores",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 5789,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e40ee0dd-79aa-42b3-c28e-7a7ee1a7af00/public"
				}
			},
			{
				"id": 166,
				"name": "WHSmith",
				"logo_url": null,
				"title": "Available in select stores",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 5788,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/1d34ca66-3d7f-41cc-85e7-8a65811ba100/public"
				}
			},
			{
				"id": 167,
				"name": "Space NK",
				"logo_url": "https://www.spacenk.com/uk/brands/c/coco-eve",
				"title": "Available online & in select stores",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 5787,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/a4675af1-0a19-462a-4ebf-917d14ac0500/public"
				}
			},
			{
				"id": 168,
				"name": "Face the Future",
				"logo_url": "https://www.facethefuture.co.uk/collections/coco-eve",
				"title": "Available online",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 5946,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/12039958-a637-4b83-f9ab-bc0fd120ca00/public"
				}
			},
			{
				"id": 169,
				"name": "Hagel Shop",
				"logo_url": "https://www.hagel-shop.de/catalogsearch/result/?q=Coco+%26+Eve",
				"title": "Available online",
				"country_tag": "europe",
				"logo": {
					"id": 5948,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f81aa85e-3aeb-435a-16b3-4f20cd62ef00/public"
				}
			},
			{
				"id": 170,
				"name": "Oz Hair & Beauty",
				"logo_url": "https://www.ozhairandbeauty.com/brands/coco-eve",
				"title": "Available online",
				"country_tag": "australia",
				"logo": {
					"id": 5949,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/6832c3c7-91e8-4370-acc6-3ada17e80200/public"
				}
			},
			{
				"id": 171,
				"name": "Hairhouse",
				"logo_url": "https://www.hairhouse.com.au/collections/coco-and-eve",
				"title": "Available online & in select stores",
				"country_tag": "australia",
				"logo": {
					"id": 5950,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/64332787-fecd-4e9e-8fe6-12fb5b15ed00/public"
				}
			},
			{
				"id": 172,
				"name": "Terry White Chemmart",
				"logo_url": "https://terrywhitechemmart.com.au/shop/products?query=coco%20&%20eve=",
				"title": "Available online & in select stores",
				"country_tag": "australia",
				"logo": {
					"id": 5951,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f49d7b53-6257-4610-0b5b-95258cf01700/public"
				}
			},
			{
				"id": 173,
				"name": "Salons Direct",
				"logo_url": "https://www.salonsdirect.com/brands/coco-eve",
				"title": "Available online",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 5952,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e42a7d26-1732-4432-cda3-47444f02ff00/public"
				}
			},
			{
				"id": 175,
				"name": "Pampas",
				"logo_url": "https://www.pampa.co.uk/brands/coco-eve",
				"title": "Available online",
				"country_tag": "united-kingdom",
				"logo": {
					"id": 5953,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/21e041b9-374b-4650-6177-7888c50cb700/public"
				}
			},
			{
				"id": 176,
				"name": "Galeries Lafayette",
				"logo_url": "https://www.galerieslafayette.com/b/coco+and+eve",
				"title": "Available online & in select stores",
				"country_tag": "europe",
				"logo": {
					"id": 5954,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/ab0c36b3-3b34-4573-a117-7c7122153000/public"
				}
			},
			{
				"id": 177,
				"name": "John Beerens",
				"logo_url": "https://www.johnbeerens.com/merken/coco-eve",
				"title": "Available online",
				"country_tag": "europe",
				"logo": {
					"id": 5955,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/17612caa-6b43-489a-ced5-050e39815900/public"
				}
			},
			{
				"id": 178,
				"name": "Recreate Yourself",
				"logo_url": "https://www.ry.com.au/brands/coco-eve.list",
				"title": "Available online",
				"country_tag": "australia",
				"logo": {
					"id": 5956,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/cee9d79a-7c8d-4cce-bb57-7c56759b5900/public"
				}
			},
			{
				"id": 179,
				"name": "The Iconic",
				"logo_url": "https://www.theiconic.com.au/coco-eve/",
				"title": "Available online",
				"country_tag": "australia",
				"logo": {
					"id": 5959,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d7037e35-5b3f-4e97-c968-f4d938cf6d00/public"
				}
			},
			{
				"id": 180,
				"name": "Lookfantastic",
				"logo_url": "https://www.lookfantastic.com.au/brands/coco-eve.list?search=coco+and+eve#",
				"title": "Available online",
				"country_tag": "australia",
				"logo": {
					"id": 5957,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/9987ebb4-66c1-4488-27a5-abbd8bdc1000/public"
				}
			},
			{
				"id": 182,
				"name": "Shoppers Drug Mart",
				"logo_url": "https://shop.shoppersdrugmart.ca/Shop/Coco-%26-Eve/c/COCO%26EVE?sort=trending&page=0",
				"title": "Available online & in select stores",
				"country_tag": "canada",
				"logo": {
					"id": 5958,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/524d574c-4f23-4afd-e17d-9398769b8a00/public"
				}
			},
			{
				"id": 183,
				"name": "Trade Secrets",
				"logo_url": "https://tradesecrets.ca/our-brands/coco-eve/",
				"title": "Available online & in stores",
				"country_tag": "canada",
				"logo": {
					"id": 5994,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/196d88f1-5910-421c-2be8-e7129b287200/public"
				}
			},
			{
				"id": 184,
				"name": "CALENDA",
				"logo_url": "https://www.calenda.it/punti-vendita/",
				"title": "Available online & in stores",
				"country_tag": "europe",
				"logo": {
					"id": 6051,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/5833b0f3-b36e-49e3-4460-50a7fef04e00/public"
				}
			},
			{
				"id": 185,
				"name": "Stay Top",
				"logo_url": "https://www.staytop.it/coco_eve",
				"title": "Available online",
				"country_tag": "europe",
				"logo": {
					"id": 6050,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/4ebff1cf-827d-48a0-eb69-59007d23c600/public"
				}
			},
			{
				"id": 186,
				"name": "Blush-Bar",
				"logo_url": "https://www.blush-bar.com.mx/coco%20%26%20eve?%20eve&_q=coco%20&map=ft",
				"title": "Available online & in stores",
				"country_tag": "mexico",
				"logo": {
					"id": 6260,
					"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/043072af-b0f2-4817-df3e-5fba3ae37300/public"
				}
			}
		],
		stockist_dropdown: {
			"id": 5,
			"default_country": "USA",
			"contry_title1": "United Kingdom",
			"contry_title2": "USA",
			"contry_title3": "Asia",
			"contry_title4": "Europe",
			"contry_title5": "Australia",
			"contry_title6": "Canada",
			"contry_title7": "Mexico",
			"contry_title8": null,
			"contry_title9": null
		},
		question_title: "Didn’t find your answer?",
		stockist_logo_title: "Stockists in",
		title: "Find us in a store near you"
	}
	const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}

	useEffect(() => {
        setIsLoading(false);
    }, []);
    return (
		<>
        	<Header toggleCart={toggleCart}
				annBar={annBar}
				timerBar={timerBar}
				mainMenu={mainMenu}
				megaMenu={megaMenu}
				menuBannerQuiz={menuBannerQuiz}
				menuBannerCode={menuBannerCode}
				dummy={true} />
			<StockistTemplate
				isLoading={isLoading}
				content={content}
			/>
			<Instagram className="bg-pink-light" isStyleguide={true} />
			{/* <Service /> */}
			<Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
			{/* <Cart showCart={showCart} toggleCart={toggleCart} /> */}
		</>
    );
}

export default stockistTemplate;
