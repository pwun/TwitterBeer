import java.sql.Date;
import java.util.Calendar;

public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("Start");
		Calendar cal = Calendar.getInstance();
		String time = "";
		time += cal.get(Calendar.DAY_OF_MONTH);
		time += ".";
		time += cal.get(Calendar.MONTH);
		time += ",";
		time += cal.get(Calendar.HOUR_OF_DAY);
		time += ":";
		time += cal.get(Calendar.MINUTE);		
		TweetCrawler crawler = new TweetCrawler("Bier", "/Users/paul/Documents/Uni/Twitter4Beer/Tweets/FinalTweets_"+ time +".xml");
	}
}