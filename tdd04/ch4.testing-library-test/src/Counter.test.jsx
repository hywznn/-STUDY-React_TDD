import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Counter from "./Counter.jsx";

describe("<Counter />", () => {
  // 스냅샷 테스트는 별도로 렌더링
  it("matches snapshot", () => {
    const { container } = render(<Counter />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot after increment", () => {
    const { container } = render(<Counter />);
    const incrementButton = screen.getByRole("button", { name: /increment/i });

    fireEvent.click(incrementButton);

    // 상태가 변경된 후의 스냅샷
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with custom value", () => {
    const { container } = render(<Counter />);
    const input = screen.getByLabelText(/set custom value/i);
    const setButton = screen.getByText("Set");

    fireEvent.change(input, { target: { value: "42" } });
    fireEvent.click(setButton);

    // 커스텀 값이 설정된 후의 스냅샷
    expect(container).toMatchSnapshot();
  });

  // 다른 테스트들은 beforeEach 사용
  describe("component functionality", () => {
    beforeEach(() => {
      render(<Counter />);
    });

    it("renders counter with initial state", () => {
      // 기본 렌더링 확인
      expect(screen.getByTestId("counter-title")).toHaveTextContent(
        "Counter Value: 0"
      );
      expect(screen.getByTestId("count-display")).toHaveTextContent("0");

      // 모든 버튼이 존재하는지 확인
      expect(
        screen.getByRole("button", { name: /increment/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /decrement/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /reset/i })
      ).toBeInTheDocument();

      // 입력 필드가 존재하는지 확인
      expect(screen.getByLabelText(/set custom value/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/enter a number/i)
      ).toBeInTheDocument();
    });

    it("increments counter when + button is clicked", () => {
      const incrementButton = screen.getByRole("button", {
        name: /increment/i,
      });

      fireEvent.click(incrementButton);

      expect(screen.getByTestId("count-display")).toHaveTextContent("1");
      expect(screen.getByTestId("counter-title")).toHaveTextContent(
        "Counter Value: 1"
      );
    });

    it("decrements counter when - button is clicked", () => {
      const decrementButton = screen.getByRole("button", {
        name: /decrement/i,
      });

      fireEvent.click(decrementButton);

      expect(screen.getByTestId("count-display")).toHaveTextContent("-1");
      expect(screen.getByTestId("counter-title")).toHaveTextContent(
        "Counter Value: -1"
      );
    });

    it("resets counter to 0 when reset button is clicked", () => {
      const incrementButton = screen.getByRole("button", {
        name: /increment/i,
      });
      const resetButton = screen.getByRole("button", { name: /reset/i });

      // 먼저 카운터를 증가시킴
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      expect(screen.getByTestId("count-display")).toHaveTextContent("2");

      // 리셋 버튼 클릭
      fireEvent.click(resetButton);
      expect(screen.getByTestId("count-display")).toHaveTextContent("0");
    });

    it("allows setting custom value through input", () => {
      const input = screen.getByLabelText(/set custom value/i);
      const setButton = screen.getByText("Set");

      // 입력 필드에 값 입력
      fireEvent.change(input, { target: { value: "42" } });
      expect(input).toHaveValue(42);

      // Set 버튼 클릭
      fireEvent.click(setButton);

      // 카운터 값이 변경되었는지 확인
      expect(screen.getByTestId("count-display")).toHaveTextContent("42");
      expect(screen.getByTestId("counter-title")).toHaveTextContent(
        "Counter Value: 42"
      );

      // 입력 필드가 초기화되었는지 확인
      expect(input).toHaveValue(null);
    });

    it("shows appropriate status messages based on count value", () => {
      const incrementButton = screen.getByRole("button", {
        name: /increment/i,
      });
      const decrementButton = screen.getByRole("button", {
        name: /decrement/i,
      });
      const resetButton = screen.getByRole("button", { name: /reset/i });

      // 초기 상태 (0)
      expect(screen.getByText(/count is zero/i)).toBeInTheDocument();
      expect(screen.queryByText(/count is positive/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/count is negative/i)).not.toBeInTheDocument();

      // 양수 상태
      fireEvent.click(incrementButton);
      expect(screen.getByText(/count is positive/i)).toBeInTheDocument();
      expect(screen.queryByText(/count is zero/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/count is negative/i)).not.toBeInTheDocument();

      // 리셋 후 음수 상태
      fireEvent.click(resetButton);
      fireEvent.click(decrementButton);
      expect(screen.getByText(/count is negative/i)).toBeInTheDocument();
      expect(screen.queryByText(/count is zero/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/count is positive/i)).not.toBeInTheDocument();
    });

    it("handles multiple rapid clicks correctly", () => {
      const incrementButton = screen.getByRole("button", {
        name: /increment/i,
      });

      // 여러 번 빠르게 클릭
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);

      expect(screen.getByTestId("count-display")).toHaveTextContent("5");
    });

    it("ignores invalid input values", () => {
      const input = screen.getByLabelText(/set custom value/i);
      const setButton = screen.getByText("Set");

      // 유효하지 않은 값 입력
      fireEvent.change(input, { target: { value: "invalid" } });
      fireEvent.click(setButton);

      // 카운터 값이 변경되지 않았는지 확인
      expect(screen.getByTestId("count-display")).toHaveTextContent("0");
    });

    it("finds elements by different query methods", () => {
      // getByRole - 접근성 관점에서 요소 찾기
      expect(
        screen.getByRole("button", { name: /increment/i })
      ).toBeInTheDocument();

      // getByLabelText - label과 연결된 요소 찾기
      expect(screen.getByLabelText(/set custom value/i)).toBeInTheDocument();

      // getByPlaceholderText - placeholder로 요소 찾기
      expect(
        screen.getByPlaceholderText(/enter a number/i)
      ).toBeInTheDocument();

      // getByTestId - data-testid로 요소 찾기
      expect(screen.getByTestId("counter-title")).toBeInTheDocument();
      expect(screen.getByTestId("count-display")).toBeInTheDocument();

      // queryByText - 존재하지 않는 요소 확인 (에러 발생하지 않음)
      expect(screen.queryByText("Non-existent text")).not.toBeInTheDocument();
    });

    it("demonstrates user interaction patterns", () => {
      const input = screen.getByLabelText(/set custom value/i);
      const setButton = screen.getByText("Set");

      // 사용자 입력 시뮬레이션
      fireEvent.change(input, { target: { value: "10" } });
      fireEvent.click(setButton);

      // 결과 확인
      expect(screen.getByTestId("count-display")).toHaveTextContent("10");

      // 키보드 이벤트도 테스트 가능
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
      // (실제로는 Enter 키 처리가 없지만, 키보드 이벤트 테스트 방법을 보여줌)
    });
  });
});
