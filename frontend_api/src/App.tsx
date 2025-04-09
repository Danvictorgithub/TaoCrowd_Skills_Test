import "./App.css";
import { useState, useMemo, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { useInfiniteScroll } from "ahooks";
import { mockPosts, PostType, simulateDelay } from "@/lib/mockData";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Icon } from "@iconify-icon/react";
const PAGE_SIZE = 10;

interface Result {
  list: PostType[];
  nextId?: number;
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const getLoadMoreList = async (
    nextId: number | undefined,
    pageSize: number
  ): Promise<Result> => {
    await simulateDelay(800); // Add artificial delay
    const start = nextId || 0;
    const end = start + pageSize;
    const newList = mockPosts.slice(start, end);
    return {
      list: newList,
      nextId: mockPosts.length > end ? end : undefined,
    };
  };

  const { data, loading, loadingMore, noMore } = useInfiniteScroll<Result>(
    (d) => getLoadMoreList(d?.nextId, PAGE_SIZE),
    {
      target: containerRef,
      isNoMore: (d) => d?.nextId === undefined,
      threshold: 100,
    }
  );

  const filteredData = useMemo(() => {
    if (!data?.list) return [];
    return data.list.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data?.list, searchQuery]);

  return (
    <>
      <main className="container mx-auto min-h-svh pb-8">
        <header className="flex items-center flex-col mt-24">
          <img src="/company_icon.png" alt="" />
          <h1 className="text-gray-800 text-xl">Technical Assessment</h1>
        </header>
        <section>
          <div className="mt-12">
            <input
              type="text"
              placeholder="Search..."
              className="border-3 rounded-md p-4 border-gray-600 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div
            ref={containerRef}
            className="mt-12 flex flex-col gap-4 max-h-[600px] overflow-y-auto"
          >
            {loading && !filteredData.length ? (
              <div className="text-center py-4">
                <p className="text-gray-600">Loading initial data...</p>
              </div>
            ) : (
              <>
                {filteredData.map((item) => (
                  <div key={item.id} className="p-4 shadow-sm rounded-md">
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold">{item.title}</h1>
                      {item.status === "success" ? (
                        <p className="p-1 bg-green-500 rounded-md font-medium text-white mb-4">
                          success
                        </p>
                      ) : item.status === "failed" ? (
                        <p className="p-1 bg-red-500 rounded-md font-medium text-white mb-4">
                          failed
                        </p>
                      ) : item.status === "upcoming" ? (
                        <p className="p-1 bg-cyan-500 rounded-md font-medium text-white mb-4">
                          upcoming
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <Collapsible>
                        <CollapsibleContent>
                          <div className="flex">
                            <p className="text-gray-500">
                              {formatDistanceToNow(item.createdAt, {
                                addSuffix: true,
                              })}
                            </p>
                            <div className="ml-4 flex gap-2">
                              <a href={item.article}>Article</a>
                              <a href={item.video}>Video</a>
                            </div>
                          </div>
                          <div className="flex gap-4 my-8">
                            <div className="flex h-[100px] w-[100px]">
                              <img
                                src={item.image}
                                alt="sample image"
                                className="object-cover h-full w-full rounded-md"
                              />
                            </div>
                            <p>{item.description}</p>
                          </div>
                        </CollapsibleContent>
                        <CollapsibleTrigger />
                      </Collapsible>
                    </div>
                  </div>
                ))}

                {loadingMore && (
                  <div className="text-center py-4">
                    <Icon
                      icon="line-md:loading-loop"
                      className="text-7xl text-blue-600"
                    ></Icon>
                  </div>
                )}

                {noMore && !searchQuery && (
                  <p className="text-center mt-4 font-bold text-gray-600">
                    End of list
                  </p>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
