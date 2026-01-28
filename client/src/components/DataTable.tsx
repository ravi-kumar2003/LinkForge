import * as React from "react";
import { Link } from "react-router-dom";
import { serverUrl } from "../helpers/Constants";
import type { UrlData } from "../interface/UrlData";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";
import axios from "axios";

interface IDataTableProps {
  data: UrlData[];
  updateReloadState: () => void;
}

const DataTable: React.FunctionComponent<IDataTableProps> = (props) => {
  const { data, updateReloadState } = props;

  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [deletedId, setDeletedId] = React.useState<string | null>(null);

  const copyToClipboard = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(`${serverUrl}/shortUrl/${url}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUrl = async (id: string) => {
    try {
      setDeletedId(id);
      await axios.delete(`${serverUrl}/shortUrl/${id}`);
      updateReloadState();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-8 pb-14">
      <div className="relative overflow-x-auto rounded-2xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl shadow-2xl">
        <table className="w-full text-sm text-left text-slate-200">
          <thead className="text-xs uppercase tracking-widest text-white bg-linear-to-r from-indigo-600 via-purple-600 to-violet-600">
            <tr>
              <th className="px-6 py-5 w-[40%]">Full URL</th>
              <th className="px-6 py-5 w-[30%]">Short URL</th>
              <th className="px-6 py-5 w-[10%] text-center">Clicks</th>
              <th className="px-6 py-5 w-[20%] text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item._id}
                className="
                  border-b border-white/5
                  bg-white/5
                  hover:bg-white/10
                  transition-colors duration-200
                "
              >
                <td className="px-6 py-4 break-all text-slate-300">
                  <Link
                    to={item.fullUrl}
                    target="_blank"
                    className="hover:text-white hover:underline transition"
                  >
                    {item.fullUrl}
                  </Link>
                </td>

                <td className="px-6 py-4 break-all">
                  <Link
                    to={`${serverUrl}/shortUrl/${item.shortUrl}`}
                    target="_blank"
                    className="text-indigo-400 hover:text-indigo-300 hover:underline transition"
                  >
                    {item.shortUrl}
                  </Link>
                </td>

                <td className="px-6 py-4 text-center font-semibold text-slate-100">
                  {item.clicks}
                </td>

                <td className="px-6 py-4 text-center space-x-4">
                  <button
                    onClick={() => copyToClipboard(item.shortUrl, item._id)}
                    title="Copy short URL"
                    className={`
                      inline-flex items-center justify-center
                      w-10 h-10 rounded-full
                      transition-all duration-200
                      ${
                        copiedId === item._id
                          ? "bg-emerald-600 text-white scale-110"
                          : "bg-white/10 text-slate-200 hover:bg-indigo-600 hover:text-white"
                      }
                    `}
                  >
                    {copiedId === item._id ? (
                      <FaCheck className="text-lg" />
                    ) : (
                      <FaRegCopy className="text-lg" />
                    )}
                  </button>

                  <button
                    onClick={() => deleteUrl(item._id)}
                    title="Delete URL"
                    className={`
                      inline-flex items-center justify-center
                      w-10 h-10 rounded-full
                      transition-all duration-200
                      ${
                        deletedId === item._id
                          ? "bg-red-600 text-white scale-110"
                          : "bg-white/10 text-slate-200 hover:bg-red-500 hover:text-white"
                      }
                    `}
                  >
                    <RiDeleteBin2Fill className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
