import AnnouncementBar from '@/components/AnnouncementBar';

export default function AnnouncementBars() {
	return (
		<>
			<h1>Announcement Bar</h1>
			<AnnouncementBar
				text="Up to 25% off + Free Gift worth $25.40"
				url="/"
				timerEnabled={true}
				countDownStart=""
				countDownEnd=""
				countDownDays=""
				countDownDay=""
				countDownHrs=""
				countDownHr=""
				countDownMin=""
				countDownSec="" />
		</>
	);
}
