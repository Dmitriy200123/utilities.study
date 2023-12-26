package demin.d.utilitiesback.repositories.statistics.entities;

public class RequestStatistics {
    private String requestType;
    private long count;

    public RequestStatistics(String requestType, long count) {
        this.requestType = requestType;
        this.count = count;
    }
}
