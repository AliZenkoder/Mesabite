"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/button";
import {
  UploadResult,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "@/utils/firebase-config";
import Image from "next/image";
import {
  addMenuCategory,
  addFolderCategory,
  getAllFolderCategoryData,
  getFolderCategoryData,
  getMenuCategoryData,
  updateFolderCategory,
  updateMenuCategory,
} from "@/services/firestore-services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  description: string;
  imageUrl: string;
  folderId: string;
  items: number;
};

const Form = ({
  isFolder,
  isEdit,
  id,
}: {
  isFolder: boolean;
  isEdit?: boolean;
  id?: string;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [foldersData, setFoldersData] = useState<any[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState("");
  const [formData, setFormData] = useState<FormState>({
    name: "",
    description: "",
    imageUrl: "",
    folderId: "",
    items: 0,
  });
  const [error, setError] = useState("");
  const [folderError, setFolderError] = useState("");

  const resetState = () => {
    setFormData({
      name: "",
      description: "",
      imageUrl: "",
      folderId: "",
      items: 0,
    });
    setCurrentFolderId("");
    setImage(null);
    setError("");
  };

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (image !== null) {
      const imageRef = ref(storage, `images/${v4()}`);
      uploadBytes(imageRef, image)
        .then((value: UploadResult) => {
          if (value) {
            getDownloadURL(value.ref).then((url) => {
              setFormData((prevState) => ({ ...prevState, imageUrl: url }));
              if (isFolder) {
                if (isEdit && id) {
                  updateFolderCategory(id, {
                    name: formData.name,
                    imageUrl: url,
                  })
                    .then((_value) => resetState())
                    .catch((error) => {
                      setError("Something went wrong category not created");
                      console.error("Category Error: ", error);
                      toast.error("Something went wrong");
                    })
                    .finally(() => {
                      toast.success(
                        `Folder Category ${isEdit ? "Updated" : "Created"}.`,
                        {
                          duration: 5000,
                          position: "bottom-center",
                        }
                      );
                      setLoading(false);
                      router.push("/");
                    });
                } else {
                  addFolderCategory({
                    name: formData.name,
                    imageUrl: url,
                  })
                    .then((_value) => resetState())
                    .catch((error) => {
                      setError("Something went wrong category not created");
                      console.error("Category Error: ", error);
                      toast.error("Something went wrong");
                    })
                    .finally(() => {
                      toast.success(
                        `Folder Category ${isEdit ? "Updated" : "Created"}.`,
                        {
                          duration: 5000,
                          position: "bottom-center",
                        }
                      );
                      setLoading(false);
                      router.push("/");
                    });
                }
              } else {
                if (isEdit && id) {
                  updateMenuCategory(id, {
                    name: formData.name,
                    description: formData.description,
                    folderId: currentFolderId,
                    imageUrl: url,
                    items: formData.items,
                    folderName: foldersData.find(
                      (f) => f?.id === currentFolderId
                    )?.name,
                  })
                    .then((_value) => resetState())
                    .catch((error) => {
                      setError("Something went wrong category not created");
                      console.error("Category Error: ", error);
                      toast.error("Something went wrong");
                    })
                    .finally(() => {
                      toast.success(
                        `Menu Category ${isEdit ? "Updated" : "Created"}.`,
                        {
                          duration: 5000,
                          position: "bottom-center",
                        }
                      );
                      setLoading(false);
                      router.push("/");
                    });
                } else {
                  addMenuCategory({
                    name: formData.name,
                    description: formData.description,
                    folderId: currentFolderId,
                    imageUrl: url,
                    items: formData.items,
                    folderName: foldersData.find(
                      (f) => f?.id === currentFolderId
                    )?.name,
                  })
                    .then((_value) => resetState())
                    .catch((error) => {
                      setError("Something went wrong category not created");
                      console.error("Category Error: ", error);
                      toast.error("Something went wrong");
                    })
                    .finally(() => {
                      toast.success(
                        `Menu Category ${isEdit ? "Updated" : "Created"}.`,
                        {
                          duration: 5000,
                          position: "bottom-center",
                        }
                      );
                      setLoading(false);
                      router.push("/");
                    });
                }
              }
            });
          }
        })
        .catch((reason: any) => {
          setError("Image upload error");
          console.error("Storage image upload errror: ", reason);
          setLoading(false);
          toast.error("Image upload error");
        });
    } else {
      if (isFolder) {
        if (isEdit && id) {
          updateFolderCategory(id, {
            name: formData.name,
          })
            .then((_value) => resetState())
            .catch((error) => {
              setError("Something went wrong category not created");
              console.error("Category Error: ", error);
              toast.error("Something went wrong");
            })
            .finally(() => {
              toast.success(
                `Folder Category ${isEdit ? "Updated" : "Created"}.`,
                {
                  duration: 5000,
                  position: "bottom-center",
                }
              );
              setLoading(false);
              router.push("/");
            });
        } else {
          addFolderCategory({
            name: formData.name,
          })
            .then((_value) => resetState())
            .catch((error) => {
              setError("Something went wrong category not created");
              console.error("Category Error: ", error);
              toast.error("Something went wrong");
            })
            .finally(() => {
              toast.success(
                `Folder Category ${isEdit ? "Updated" : "Created"}.`,
                {
                  duration: 5000,
                  position: "bottom-center",
                }
              );
              setLoading(false);
              router.push("/");
            });
        }
      } else {
        if (isEdit && id) {
          updateMenuCategory(id, {
            name: formData.name,
            description: formData.description,
            folderId: currentFolderId,
            items: formData.items,
            folderName: foldersData.find((f) => f?.id === currentFolderId)
              ?.name,
          })
            .then((_value) => resetState())
            .catch((error) => {
              setError("Something went wrong category not created");
              console.error("Category Error: ", error);
              toast.error("Something went wrong");
            })
            .finally(() => {
              toast.success(
                `Menu Category ${isEdit ? "Updated" : "Created"}.`,
                {
                  duration: 5000,
                  position: "bottom-center",
                }
              );
              setLoading(false);
              router.push("/");
            });
        } else {
          addMenuCategory({
            name: formData.name,
            description: formData.description,
            folderId: currentFolderId,
            items: formData.items,
            folderName: foldersData.find((f) => f?.id === currentFolderId)
              ?.name,
          })
            .then((_value) => resetState())
            .catch((error) => {
              setError("Something went wrong category not created");
              console.error("Category Error: ", error);
              toast.error("Something went wrong");
            })
            .finally(() => {
              toast.success(
                `Menu Category ${isEdit ? "Updated" : "Created"}.`,
                {
                  duration: 5000,
                  position: "bottom-center",
                }
              );
              setLoading(false);
              router.push("/");
            });
        }
      }
    }
  };

  const handleChange = (e: any) => {
    if (e.target.name === "image") {
      setImage(e.target.files?.length !== undefined ? e.target.files[0] : null);
    } else if (e.target.name === "name" && e.target.value?.length === 51) {
      // do nothing
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  useEffect(() => {
    if (isEdit && id !== undefined && id !== "") {
      if (isFolder) {
        getFolderCategoryData(id).then((data) =>
          setFormData((prevState) => ({
            ...prevState,
            name: data?.name,
            imageUrl: data?.imageUrl,
          }))
        );
      } else {
        getMenuCategoryData(id).then((data) =>
          setFormData((prevState) => ({
            ...prevState,
            name: data?.name,
            imageUrl: data?.imageUrl,
          }))
        );
      }
    }
  }, [isEdit, id]);

  useEffect(() => {
    if (!isFolder) {
      setLoading(true);
      getAllFolderCategoryData()
        .then((folderCategories) => {
          setFoldersData(folderCategories);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    if (!isFolder && foldersData?.length === 0) {
      setFolderError("No Folder available please create folder category.");
    } else {
      setFolderError("");
    }
  }, [foldersData]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* image input div */}
      <div
        className={"flex flex-col gap-2" + (isFolder ? " order-2" : " order-1")}
      >
        <div className="text-lg text-primary-text">Image (Optional)</div>
        <label
          className="
                        flex
                        flex-col
                        gap-8
                        justify-center
                        items-center
                        min-h-72
                        border-4
                        border-primary-text
                        skew-y-[2deg]
                        skew-x-6
                        uneven
                        text-center
                    "
        >
          <input
            type="file"
            name="image"
            className="hidden"
            onChange={handleChange}
          />
          <Image width={89} height={83} src="/upload.png" alt="upload" />
          <div className="text-lg text-primary-text">
            {image !== null ? image?.name : "Click here to upload an image"}
          </div>
        </label>
      </div>
      {/* name input div */}
      <div
        className={"flex flex-col gap-2" + (isFolder ? " order-1" : " order-2")}
      >
        <div className="text-lg text-primary-text">Name</div>
        <div
          className="
                        relative
                        w-full
                        border-2
                        border-primary-text
                        skew-y-[-1deg]
                        skew-x-12
                        uneven
                        px-2
                        py-1
                    "
        >
          <input
            type="text"
            name="name"
            required
            className="
                            bg-transparent
                            w-full
                            focus-visible:outline-none
                            z-10
                        "
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="self-end text-secondary-text text-sm">{`${formData.name?.length}/50`}</div>
      </div>
      {/* description input div */}
      {!isFolder ? (
        <div className="flex flex-col gap-2 order-3">
          <div className="text-lg text-primary-text">
            Description (Optional)
          </div>
          <div
            className="
                        relative
                        w-full
                        border-2
                        border-primary-text
                        skew-y-[-1deg]
                        skew-x-12
                        uneven
                        px-2
                        py-1
                    "
          >
            <textarea
              className="
                            bg-transparent
                            w-full
                            focus-visible:outline-none
                            z-10
                        "
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={8}
            ></textarea>
          </div>
        </div>
      ) : null}
      {/* Folder input div */}
      {!isFolder ? (
        <div
          className={
            "flex flex-col gap-2" + (isFolder ? " order-1" : " order-2")
          }
        >
          <div className="text-lg text-primary-text">Folder</div>
          <div
            className="
                        relative
                        w-full
                        border-2
                        border-primary-text
                        skew-y-[-1deg]
                        skew-x-12
                        uneven
                        px-2
                        py-1
                    "
          >
            <select
              name="folder"
              required
              className="
                            bg-transparent
                            w-full
                            focus-visible:outline-none
                            z-10
                        "
              value={currentFolderId}
              onChange={(e) => setCurrentFolderId(e.target.value)}
            >
              <option value={""} disabled>
                Select
              </option>
              {foldersData?.length > 0 ? (
                foldersData?.map((data) => (
                  <option value={data?.id}>{data?.name}</option>
                ))
              ) : (
                <option value={""} disabled>
                  No Folders
                </option>
              )}
            </select>
          </div>
        </div>
      ) : null}
      {/* items input div */}
      {!isFolder ? (
        <div
          className={
            "flex flex-col gap-2" + (isFolder ? " order-1" : " order-2")
          }
        >
          <div className="text-lg text-primary-text">Items (Optional)</div>
          <div
            className="
                        relative
                        w-full
                        border-2
                        border-primary-text
                        skew-y-[-1deg]
                        skew-x-12
                        uneven
                        px-2
                        py-1
                    "
          >
            <input
              type="number"
              name="items"
              required
              className="
                            bg-transparent
                            w-full
                            focus-visible:outline-none
                            z-10
                        "
              value={formData.items}
              onChange={handleChange}
            />
          </div>
        </div>
      ) : null}
      {/* Errors */}
      {error ? <div className="text-md text-rose-500">{error}</div> : null}
      {folderError ? (
        <div className="text-md text-rose-500">{folderError}</div>
      ) : null}
      {/* action div */}
      <div
        className="
                    relative
                    bottom-0
                    flex
                    gap-6
                    justify-between
                    px-6
                    py-4
                    mt-auto
                    order-4
                "
      >
        <Button disabled={loading} variant="secondary" navigateLink="/">
          Cancel
        </Button>
        <Button
          disabled={loading || error !== "" || folderError !== ""}
          variant="primary"
          type="submit"
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
