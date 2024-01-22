package demin.d.utilitiesback.repositories.requestStatistics.entities;

import lombok.Getter;

import java.util.UUID;

@Getter
public class RequestStatistics {
    private final String requestType;
    private final long count;

    public RequestStatistics(String requestType, long count) {
        this.requestType = requestType;
        this.count = count;
    }
}
