import Joi from 'joi';
// import Products from '../models/products';
import Products from '../models/products';

const productError = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    desc: Joi.string().required(),
    quality: Joi.number().required(),
    status: Joi.boolean().required(),
})

export const getAll = async (req, res) => {
    try {
        const data = await Products.find();
        if (!data.length === 0) {
            return res.status(400).json({
                message: "Khoong co san pham nao",
            })
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.json({
            message: error
        })

    }

}
export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = productError.validate(body);
        if (error) {
            const errors = error.details.map((productItem) => productItem.message);
            return res.json({
                message: errors
            })
        }

        const data = await Products.create(body);
        if (!data) {
            return res.status(400).json({
                message: "Them san pham khong thanh cong",

            });
        };
        return res.status(200).json({
            message: "Them san pham thanh cong",
            data
        })

    } catch (error) {
        return res.json({
            message: error
        })
    }

}
export const remove = async (req, res) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Xoa san pham thanh cong"
        });
    } catch (error) {
        return res.json({
            message: error
        })
    }

}
export const get = async (req, res) => {
    try {
        const data = await Products.findOne({ _id: req.params.id });
        if (!data) {
            return res.status.json({
                message: "Khong co san pham nao"
            })
        };
        return res.status(200).json(data)
    } catch (error) {
        return res.json({
            message: error
        })
    }

}
export const update = async (req, res) => {
    try {
        const body = req.body;
        const data = await Products.findByIdAndUpdate({ _id: req.params.id }, body, { new: true });
        if (!data) {
            return res.status(400).json({
                message: "Cap nhat san pham that bai"
            })
        };
        return res.status(200).json({
            message: "Cap nhat san pham thanh cong",
            data
        });
    } catch (error) {
        return res.json({
            message: error
        })
    }


}