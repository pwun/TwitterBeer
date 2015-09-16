import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

public class TweetWriter {
	private static final String HEAD = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<add>";
	private String writePath = "";
	private FileWriter wr;
	public TweetWriter(String writePath) {
		this.writePath = writePath;
		initWriter();
		writeLine(HEAD);
	}
	public void writeLine(String line) {
		try {
			write(line);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private void initWriter() {
		try {
			wr = new FileWriter(writePath);
		} catch (IOException e) {
			System.out.println("Error: " + e
					+ " - Could not init FileWriter with given Path.");
			e.printStackTrace();
		}
	}
	public void write(String writeThis) throws IOException {
		wr.append(writeThis);
		wr.flush();
	}
	public void closeWriter() {
		try {
	        wr.write("</add>");
			wr.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}