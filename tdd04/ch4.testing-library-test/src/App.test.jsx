import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";

describe("<App />", () => {
  it("renders component correctly", () => {
    const { container } = render(<App />);

    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();

    expect(container.getElementsByClassName("App-logo")).toHaveLength(1);
    expect(container.getElementsByClassName("App-logo")[0]).toHaveAttribute(
      "src"
    );

    expect(container.getElementsByTagName("p")).toHaveLength(1);
    expect(container.getElementsByTagName("p")[0]).toHaveTextContent(
      "Edit src/App.jsx and save to reload."
    );

    expect(container).toMatchSnapshot();
  });

  // 새로운 테스트 케이스들
  it("finds elements by different queries", () => {
    render(<App />);

    // getByRole - 접근성 관점에서 요소 찾기
    const link = screen.getByRole("link", { name: /learn react/i });
    expect(link).toBeInTheDocument();

    // getByAltText - alt 속성으로 이미지 찾기
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();

    // getByTestId - data-testid 속성으로 요소 찾기 (권장하지 않음)
    // const element = screen.getByTestId("test-id");
  });

  it("handles user interactions", async () => {
    render(<App />);

    const link = screen.getByRole("link", { name: /learn react/i });

    // 링크 클릭 이벤트 테스트 (fireEvent 사용)
    fireEvent.click(link);

    // 링크가 올바른 href를 가지고 있는지 확인
    expect(link).toHaveAttribute("href", "https://reactjs.org");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("demonstrates different query methods", () => {
    render(<App />);

    // getByText - 정확한 텍스트 매칭 (부분 텍스트)
    const editText = screen.getByText(/edit/i);
    expect(editText).toBeInTheDocument();

    // getByText with regex - 정규식으로 매칭
    const learnText = screen.getByText(/learn react/i);
    expect(learnText).toBeInTheDocument();

    // queryByText - 요소가 없을 때 null 반환 (에러 발생하지 않음)
    const nonExistentText = screen.queryByText("Non-existent text");
    expect(nonExistentText).not.toBeInTheDocument();

    // findByText - 비동기적으로 요소 찾기 (Promise 반환)
    // const asyncElement = await screen.findByText("Some async text");
  });

  it("tests component structure", () => {
    const { container } = render(<App />);

    // 특정 클래스를 가진 요소가 있는지 확인
    const appElement = container.querySelector(".App");
    expect(appElement).toBeInTheDocument();

    // 특정 태그의 개수 확인
    const headerElements = container.getElementsByTagName("header");
    expect(headerElements).toHaveLength(1);

    // 중첩된 구조 확인
    const appHeader = container.querySelector(".App-header");
    expect(appHeader).toBeInTheDocument();
  });
});
