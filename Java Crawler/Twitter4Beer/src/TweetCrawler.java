import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.List;

import twitter4j.*;
import twitter4j.conf.ConfigurationBuilder;

public class TweetCrawler {
	
	TweetWriter writer;
	int counter;
	
	public TweetCrawler(String searchterm, String outputPath){
		System.out.println("Crawler created");
		counter = 0;
		writer = new TweetWriter(outputPath);
		crawl(searchterm);
	}
	
	private void crawl(String arg){
		
		ConfigurationBuilder cb = new ConfigurationBuilder();
		cb.setDebugEnabled(true)
		  .setOAuthConsumerKey("S7hNZ4feqxcWQKQroY8Fopjl0")
		  .setOAuthConsumerSecret("T9Z4iLuICRbNTr2F3PfmlNkPXeunGDcXIMRUO8IHb2zAbGtuRg")
		  .setOAuthAccessToken("3365729259-eDJQ1TbdiNgYQGmEjxHqZQPhG83QlHYcC0fp16F")
		  .setOAuthAccessTokenSecret("z7rFwcBzbtLYJ5Tp479yA5FIVuWwoT2QEI1ne3RJtdTrW");
		TwitterFactory tf = new TwitterFactory(cb.build());
		Twitter twitter = tf.getInstance();

	    try {
	        Query query = new Query(arg);
	        QueryResult result;
	        do {
	            result = twitter.search(query);
	            List<Status> tweets = result.getTweets();
	            for (Status tweet : tweets) {
	            	counter++;
	                System.out.println(counter);
	                writer.writeLine("<doc><field name=\"id\">"+tweet.getUser().getId() + "</field><field name=\"screenName\">"+ checkForExcludedChars(tweet.getUser().getScreenName()) + "</field><field name=\"tweetText\">" + 
	                		checkForExcludedChars(tweet.getText()) + "</field><field name=\"followerCount\">" + tweet.getUser().getFollowersCount() +"</field><field name=\"location\">" +
	                		tweet.getGeoLocation() + "</field><field name=\"tweetSource\">" + tweet.getSource() + "</field><field name=\"tweetRetweeted\">" +
	                		tweet.getRetweetedStatus() + "</field><field name=\"tweetRetweetedCount\">" + tweet.getRetweetCount() + "</field><field name=\"mediaType\">" +
	                		tweet.getMediaEntities() + "</field><field name=\"createdAt\">" + tweet.getCreatedAt() + "</field></doc>");
	            }
	        } while ((query = result.nextQuery()) != null);
	        writer.closeWriter();
	        System.exit(0);
	    } catch (TwitterException te) {
	    	writer.closeWriter();
	        te.printStackTrace();
	        System.out.println("Failed to search tweets: " + te.getMessage());
	        System.exit(-1);
	    }
	}
	
	private String checkForExcludedChars(String s){
		String snew = "";
		for(int i = 0; i < s.length(); i++){
			switch (s.charAt(i)){
			case '<': snew += "&lt;";
			break;
			case '>': snew += "&gt;";
			break;
			case '&': snew += "&amp;";
			break;
			case '%': snew += "&#37;";
			break;
			case '"': snew += "&quot;";
			break;
			case '\'': snew += "&apos;";
			break;
			default: snew += s.charAt(i);
			}
		}
		return snew;
	}
}

