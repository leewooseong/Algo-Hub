package algohub.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

// Response API Form
@Data
@AllArgsConstructor
@Builder
public class DefaultRes<T> {
    private int statusCode;
    private String message;
    private T data;

    public DefaultRes(final int statusCode, final String responseMessage) {
        this.statusCode = statusCode;
        this.message = responseMessage;
        this.data = null;
    }

    public static<T> DefaultRes<T> res(final int statusCode, final String responseMessage) {
        return res(statusCode, responseMessage, null);
    }

    public static<T> DefaultRes<T> res(final int statusCode, final String responseMessage, final T t) {
        return DefaultRes.<T>builder()
                .data(t)
                .statusCode(statusCode)
                .message(responseMessage)
                .build();
    }
}
