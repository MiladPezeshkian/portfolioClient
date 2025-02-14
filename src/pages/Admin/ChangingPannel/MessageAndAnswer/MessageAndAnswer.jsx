import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiSend,
  FiArrowLeft,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Contact.module.css";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const API_BASE = "https://drfathiserver.onrender.com/api/v1/contact";

const MessageAndAnswer = () => {
  const queryClient = useQueryClient();
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [pagination] = useState({ page: 1, limit: 10 });

  // Fetch messages with error handling
  const { data, isLoading, isError } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${API_BASE}/admin?page=${pagination.page}&limit=${pagination.limit}`,
          { credentials: "include" }
        );
        if (!response.ok) throw new Error("Failed to load messages");
        return response.json();
      } catch (error) {
        toast.error(error.message, { className: styles.toastError });
        throw error;
      }
    },
    refetchInterval: 60000, // Auto-refresh every 60 seconds
  });

  // Enhanced send handler with status tracking
  const sendReplyHandler = async () => {
    if (!selectedContact || !replyContent.trim() || isSending) return;

    setIsSending(true);
    const toastId = toast.loading("Sending response...", {
      className: styles.toastInfo,
    });

    try {
      const response = await fetch(`${API_BASE}/admin/reply`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactId: selectedContact._id,
          replyMessage: replyContent,
        }),
      });

      if (!response.ok) throw new Error("Reply failed");

      toast.update(toastId, {
        render: "Response sent successfully 🚀",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        className: styles.toastSuccess,
      });

      queryClient.invalidateQueries(["contacts"]);
      setReplyContent("");
      setSelectedContact(null);
    } catch (error) {
      toast.update(toastId, {
        render: `Error: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        className: styles.toastError,
      });
    } finally {
      setIsSending(false);
    }
  };

  // Animated Status Badge
  const StatusBadge = ({ status }) => (
    <motion.span
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className={`${styles.statusBadge} ${styles[status]}`}
    >
      {status === "answered" ? (
        <FiCheckCircle className={styles.statusIcon} />
      ) : (
        <FiXCircle className={styles.statusIcon} />
      )}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </motion.span>
  );

  StatusBadge.propTypes = {
    status: PropTypes.string.isRequired,
  };

  // Responsive layout handler
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>📬 Message Management</h1>
        {isMobile && selectedContact && (
          <button
            className={styles.mobileBackButton}
            onClick={() => setSelectedContact(null)}
          >
            <FiArrowLeft size={24} />
          </button>
        )}
      </header>

      <div className={styles.mainContent}>
        {(!isMobile || !selectedContact) && (
          <div className={styles.messageList}>
            {isLoading ? (
              <div className={styles.loadingWrapper}>
                <LoadingSpinner />
              </div>
            ) : isError ? (
              <div className={styles.errorMessage}>
                ⚠️ Failed to load messages
              </div>
            ) : (
              <AnimatePresence>
                {data?.data?.contacts?.map((contact) => (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`${styles.messageItem} ${
                      selectedContact?._id === contact._id && styles.active
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className={styles.contactName}>{contact.name}</div>
                    <div className={styles.contactEmail}>{contact.email}</div>
                    <StatusBadge status={contact.status} />
                    <div className={styles.contactDate}>
                      {new Date(contact.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        )}

        <AnimatePresence>
          {selectedContact && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={styles.messageDetails}
            >
              <div className={styles.detailsHeader}>
                <h2>{selectedContact.title}</h2>
                <button
                  className={styles.closeButton}
                  onClick={() => setSelectedContact(null)}
                  aria-label="Close details"
                >
                  &times;
                </button>
              </div>

              <div className={styles.messageContent}>
                <div className={styles.metaInfo}>
                  <div className={styles.timestamp}>
                    <FiClock className={styles.timeIcon} />
                    {new Date(selectedContact.createdAt).toLocaleString(
                      "en-US",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }
                    )}
                  </div>
                  <div className={styles.userInfo}>
                    <span className={styles.infoLabel}>From:</span>
                    {selectedContact.name} ({selectedContact.email})
                  </div>
                </div>
                <div className={styles.messageText}>
                  {selectedContact.message}
                </div>
              </div>

              <div className={styles.replyEditor}>
                <h3 className={styles.editorTitle}>✍️ Write Response</h3>
                <ReactQuill
                  value={replyContent}
                  onChange={setReplyContent}
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline"],
                      ["blockquote", "code-block"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link"],
                      ["clean"],
                    ],
                  }}
                  theme="snow"
                  placeholder="Type your response here..."
                  className={styles.richTextEditor}
                />
              </div>

              <button
                className={styles.sendButton}
                onClick={sendReplyHandler}
                disabled={!replyContent.trim() || isSending}
              >
                {isSending ? (
                  <LoadingSpinner size="20px" />
                ) : (
                  <>
                    <FiSend className={styles.sendIcon} />
                    Send Response
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MessageAndAnswer;
